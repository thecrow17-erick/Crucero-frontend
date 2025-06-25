import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { Micro, IGetAllBuses } from '../../interface';
import { BusesService } from '../../services/buses.service';
import { IApiResponse } from '../../../shared/interface';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-buses-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ToastrModule
  ],
  templateUrl: './buses-table.component.html',
})
export class BusesTableComponent implements OnInit {
  private toastService = inject(ToastrService);
  private busesService = inject(BusesService);

  public buses = signal<Micro[]>([]);
  public isLoading = signal<boolean>(false);

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'color', 'placa', 'estado', 'id_empleado', 'createdAt', 'updatedAt', 'acciones'];

  ngOnInit(): void {
    this.loadBuses();
  }

  private loadBuses(): void {
    this.isLoading.set(true);


    // Cuando tengas el servicio real, descomenta esto:
    this.busesService.getBuses().subscribe({
      next: (response: IApiResponse<IGetAllBuses>) => {
        this.buses.set(response.data.micros);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error al cargar buses:', error);
        this.isLoading.set(false);
      }
    });
  }

  // Método para formatear fechas
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Método para obtener las primeras letras del UUID
  getShortId(id: string): string {
    return id.substring(0, 8) + '...';
  }

  // Método para copiar al portapapeles
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.success('ID copiado al portapapeles', 'Éxito');
      console.log('ID copiado al portapapeles');
    }).catch(err => {
      this.toastService.error('Error al copiar al portapapeles', 'Error');
      console.error('Error al copiar al portapapeles:', err);
    });
  }

  // Método para editar bus
  editBus(bus: Micro): void {
    console.log('Editar bus:', bus);
    // Aquí puedes navegar a la página de edición o abrir un modal
    // this.router.navigate(['/buses/edit', bus.id]);
  }

  // Método para obtener el texto del estado
  getEstadoText(estado: boolean): string {
    return estado ? 'Activo' : 'Inactivo';
  }

  // Método para obtener la clase CSS del estado
  getEstadoClass(estado: boolean): string {
    return estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }
}
