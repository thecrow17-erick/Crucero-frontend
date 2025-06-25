import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { EmployeedService } from '../../services';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../../../shared/services';
import { ICreateEmployeed, ICreateEntity } from '../../../landing/interface';

@Component({
  selector: 'app-create-employeed-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule
  ],
  templateUrl: './create-employeed-form.component.html',
})
export class CreateEmployeedFormComponent implements OnInit {
  private toastService = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private employeedService = inject(EmployeedService);
  private localStorage = inject(LocalstorageService);

  public isLoading = signal<boolean>(false);
  public employeeForm!: FormGroup;

  // Opciones para el select de tipo
  tipoOptions = [
    { value: 'CHOFER', label: 'Chofer' },
    { value: 'ADMIN', label: 'Administrador' },
  ];

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.employeeForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      correo: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      tipo: ['', [Validators.required]]
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.isLoading.set(true);
      const entidadId = this.localStorage.getItem<string>('idEntidad');
      const formData: ICreateEmployeed = {
        nombre: this.employeeForm.value.nombre,
        correo: this.employeeForm.value.correo,
        tipo: "EMPLEADO",
        contrasena: `${this.employeeForm.value.nombre[0].toLowerCase()}-${this.employeeForm.value.tipo}`,
        id_entidad: entidadId!,
        tipo_empleado: this.employeeForm.value.tipo
      }

      console.log('Datos del empleado:', formData);

      // Aquí puedes llamar al servicio para crear el empleado
      this.employeedService.createEmployeed(formData).subscribe({
        next: (response) => {
          console.log('Empleado creado exitosamente:', response);
          this.toastService.success('Empleado creado exitosamente', 'Éxito');
          this.isLoading.set(false);
          this.employeeForm.reset();
        },
        error: (error) => {
          console.error('Error al crear empleado:', error);
          this.toastService.error('Error al crear empleado', 'Error');
          this.isLoading.set(false);
        }
      });

      // Simulación de carga
      setTimeout(() => {
        this.isLoading.set(false);
        this.employeeForm.reset();
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  // Método para marcar todos los campos como tocados (para mostrar errores)
  private markFormGroupTouched(): void {
    Object.keys(this.employeeForm.controls).forEach(key => {
      const control = this.employeeForm.get(key);
      control?.markAsTouched();
    });
  }

  // Método para resetear el formulario
  onReset(): void {
    this.employeeForm.reset();
  }

  // Getters para facilitar el acceso a los controles en el template
  get nombre() { return this.employeeForm.get('nombre'); }
  get correo() { return this.employeeForm.get('correo'); }
  get tipo() { return this.employeeForm.get('tipo'); }
}
