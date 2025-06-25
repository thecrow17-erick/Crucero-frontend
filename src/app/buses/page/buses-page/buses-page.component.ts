import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { BusesTableComponent } from '../../components';

@Component({
  selector: 'app-buses-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    BusesTableComponent
  ],
  templateUrl: './buses-page.component.html',
})
export class BusesPageComponent {
  // Esta página solo es un contenedor
  // La lógica de datos está en BusesTableComponent
}
