import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { EmployeedTableComponent } from '../../components';
import { Router, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-employees-list-page',
  standalone: true,
  imports: [
    MaterialModule,
    EmployeedTableComponent,
  ],
  templateUrl: './employees-list-page.component.html',
})
export class EmployeesListPageComponent {

  private router = inject(Router);

  // Método para navegar a la página de crear empleado
  onCreateEmployee(): void {
    this.router.navigate(['/dashboard/employees/create']);
  }
}
