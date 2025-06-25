import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { BusesCreateFormComponent } from '../../components';

@Component({
  selector: 'app-buses-create-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    BusesCreateFormComponent
  ],
  templateUrl: './buses-create-page.component.html',
})
export class BusesCreatePageComponent { }
