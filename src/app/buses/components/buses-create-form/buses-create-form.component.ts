import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { EmployeedService } from '../../../employeed/services';
import { Empleado } from '../../../employeed/interfaces';

// Mock interface para empleados (ajusta según tu interfaz real)
interface Employee {
  id: string;
  nombre: string;
  email: string;
}

@Component({
  selector: 'app-buses-create-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './buses-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusesCreateFormComponent implements OnInit {

  private fb = new FormBuilder();
  private employeesService = inject(EmployeedService);
  public allEmployees = signal<Empleado[]>([]);


  public busForm!: FormGroup;
  public isLoading = signal<boolean>(false);
  public employees = signal<Employee[]>([]);

  ngOnInit(): void {
    this.initForm();
    this.getAllEmployees();
    this.loadEmployees();
  }

  private initForm(): void {
    this.busForm = this.fb.group({
      placa: ['', [Validators.required, Validators.pattern(/^[A-Z]{3}-\d{3}$/)]],
      color: ['#000000', [Validators.required]],
      id_empleado: ['', [Validators.required]]
    });
  }

  private loadEmployees(): void {
    // Mock data - reemplaza con tu servicio real
    const mockEmployees: Employee[] = [
      { id: '1', nombre: 'Juan Pérez', email: 'juan@example.com' },
      { id: '2', nombre: 'María García', email: 'maria@example.com' },
      { id: '3', nombre: 'Carlos López', email: 'carlos@example.com' },
    ];

    this.employees.set(mockEmployees);
  }

  public onSubmit(): void {
    if (this.busForm.valid) {
      this.isLoading.set(true);

      const formData = this.busForm.value;
      console.log('Datos del formulario:', formData);

      // Aquí harías la petición al API
      setTimeout(() => {
        this.isLoading.set(false);
        // Reset form después de envío exitoso
        this.busForm.reset();
        this.busForm.patchValue({ color: '#000000' });
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.busForm.controls).forEach(key => {
      const control = this.busForm.get(key);
      control?.markAsTouched();
    });
  }

  public getAllEmployees(): void {
    this.employeesService.getAllEmployeed().subscribe({
      next: (response) => {
        this.allEmployees.set(response.data.empleados.filter(emp => emp.tipo === "CHOFER"));
      },
      error: (error) => {
        console.error('Error al cargar empleados:', error);
      }
    });
  }

  // Getters para facilitar el acceso a los controles
  get placa() { return this.busForm.get('placa'); }
  get color() { return this.busForm.get('color'); }
  get id_empleado() { return this.busForm.get('id_empleado'); }
}
