import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import {GoogleMap, GoogleMapsModule, MapInfoWindow} from '@angular/google-maps';
import { ICreateEntity, IDivisa, IGetDivisas } from '../../interface';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { EmployeedService, EntityService } from '../../services';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-create-entity-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    GoogleMapsModule,
    ToastrModule,
    RouterLink
  ],
  templateUrl: './create-entity-form.component.html',
})
export class CreateEntityFormComponent implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private entityId = signal<string>('');
  public is_pass = signal(false);
  public divisas = signal<IDivisa[]>([]);
  private entityService = inject(EntityService);
  private employeedService = inject(EmployeedService);
  private toastr= inject(ToastrService);
  public isLoad = signal<boolean>(false);
  // Google Maps configuration
  @ViewChild(GoogleMap) map!: GoogleMap;

  // Default center (puedes cambiar estas coordenadas por las de tu ciudad)
  mapCenter: google.maps.LatLngLiteral = { lat: -17.780090, lng: -63.182514 }; // Asunción, Paraguay
  mapZoom = 12;

  // Marker position
  markerPosition: google.maps.LatLngLiteral | null = null;

  // Map options
  mapOptions: google.maps.MapOptions = {
    center: this.mapCenter,
    zoom: this.mapZoom,
    mapTypeId: 'roadmap',
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false
  };

  ngOnInit(): void {
    this.getDivisas();
  }

  public isViewPass(): void{
    this.is_pass.update((pass)=>!pass);
  }

  // Método para manejar clicks en el mapa
  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Actualizar la posición del marcador
      this.markerPosition = { lat, lng };

      // Actualizar los valores del formulario
      this.firstFormGroup.patchValue({
        latitude: lat.toFixed(6),
        longitude: lng.toFixed(6)
      });

      // Obtener la dirección usando geocodificación inversa
      this.getAddressFromCoordinates(lat, lng);
    }
  }

  // Método para obtener la dirección a partir de las coordenadas (Geocodificación Inversa)
  getAddressFromCoordinates(lat: number, lng: number): void {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        // Obtener la dirección más específica disponible
        const address = results[0].formatted_address;

        // Actualizar el campo de dirección en el formulario
        this.firstFormGroup.patchValue({
          address: address
        });
      } else {
        console.error('No se pudo obtener la dirección:', status);
        // Opcionalmente, puedes mostrar un mensaje al usuario
        this.firstFormGroup.patchValue({
          address: `Coordenadas: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
        });
      }
    });
  }

  firstFormGroup = this._formBuilder.group({
    name: ['', [Validators.required,Validators.minLength(5)]],
    type: ['', [Validators.required]],
    divisa: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    wallet: ['', [Validators.required, Validators.minLength(5)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    latitude: ['',[Validators.required]],
    longitude: ['',[Validators.required]]
  });

  secondFormGroup = this._formBuilder.group({
    email: ['', [Validators.required,Validators.email]],
    name: ['', [Validators.required,Validators.minLength(5)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });


  private getDivisas(): void {
    this.entityService.getDivisas().subscribe({
      next: (value)=> {
        console.log("Obteniendo divisas");
        this.divisas.set(value.data.divisas);
      },
      error:(err)=> {
        console.log("Error al obtener las divisas", err);
      },
    })
  }


  public onSubmitForm1(): void {

    if (this.firstFormGroup.valid) {
      this.isLoad.set(true);
      const formData: ICreateEntity = {
        nombre: this.firstFormGroup.value.name || '',
        tipo: this.firstFormGroup.value.type || '',
        correo_contacto: this.firstFormGroup.value.email || '',
        wallet_address: this.firstFormGroup.value.wallet || '',
        direccion: this.firstFormGroup.value.address || '',
        latitud: parseFloat(this.firstFormGroup.value.latitude || '0'),
        longitud: parseFloat(this.firstFormGroup.value.longitude || '0'),
        cobro_pasaje: 2, // Puedes ajustar este valor según tus necesidades
        id_divisa: this.firstFormGroup.value.divisa || ''
      };

      console.log("Datos del formulario:", formData);

      // Aquí puedes llamar al servicio para crear la entidad
      this.entityService.createEntity(formData).subscribe({
        next: (response) => {
          this.toastr.success("Se creo la entidad");
          this.entityId.set(response.data.entidad.id);
          console.log("Entidad creada exitosamente:", response);
          // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito o redirigir al usuario
        },
        error: (error) => {
          console.error("Error al crear la entidad:", error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        }
      });
      this.isLoad.set(false);
    } else {
      console.error("Formulario inválido o posición del marcador no establecida.");
    }
  }


  public onSubMitForm2(): void {
    if (this.secondFormGroup.valid) {
      this.isLoad.set(true);
      const formData = {
        nombre: this.secondFormGroup.value.name || '',
        correo: this.secondFormGroup.value.email || '',
        contrasena: this.secondFormGroup.value.password || '',
        tipo: 'EMPLEADO',
        tipo_empleado: 'ADMIN',
        id_entidad: this.entityId()
      };

      console.log("Datos del formulario:", formData);

      // Aquí puedes llamar al servicio para crear el empleado
      this.employeedService.createAdminEmployeed(formData).subscribe({
        next: (response) => {
          this.toastr.success("Se creo el empleado");
          console.log("Empleado creado exitosamente:", response);
          // Aquí puedes manejar la respuesta, como mostrar un mensaje de éxito o redirigir al usuario
        },
        error: (error) => {
          console.error("Error al crear el empleado:", error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        }
      });
      this.isLoad.set(false);
    } else {
      console.error("Formulario inválido.");
    }
  }
}
