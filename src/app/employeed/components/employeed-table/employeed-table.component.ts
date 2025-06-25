import { Component, inject, OnInit, signal } from '@angular/core';
import { EmployeedService } from '../../services';
import { Empleado, IGetAllEmployeed } from '../../interfaces';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { IApiResponse } from '../../../shared/interface';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employeed-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ToastrModule
  ],
  templateUrl: './employeed-table.component.html',
})
export class EmployeedTableComponent implements OnInit {
  private toastService = inject(ToastrService);
  private employeedService = inject(EmployeedService);

  public employees = signal<Empleado[]>([]);
  public isLoading = signal<boolean>(false);

  // Columnas que se mostrarán en la tabla
  displayedColumns: string[] = ['id', 'tipo', 'nombre', 'correo', 'createdAt', 'updatedAt', 'acciones'];

  ngOnInit(): void {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.isLoading.set(true);

    this.employeedService.getAllEmployeed().subscribe({
      next: (response) => {
        this.employees.set(response.data.empleados);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.log(error);
        console.error('Error al cargar empleados:', error);
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
      this.toastService.success('ID copiado al portapapeles', 'Éxito')
    }).catch(err => {
      this.toastService.error('Error al copiar al portapapeles', 'Error');
      console.error('Error al copiar al portapapeles:', err);
    });
  }

  // Método para editar empleado
  editEmployee(employee: Empleado): void {
    console.log('Editar empleado:', employee);
    // Aquí puedes navegar a la página de edición o abrir un modal
    // this.router.navigate(['/employees/edit', employee.id]);
  }

}
