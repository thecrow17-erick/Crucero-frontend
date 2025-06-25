import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { RouterModule } from '@angular/router';
import { CreateEmployeedFormComponent } from '../../components';

@Component({
  selector: 'app-employeed-create-page',
  standalone: true,
  imports: [
    MaterialModule,
    CreateEmployeedFormComponent,
    RouterModule
  ],
  templateUrl: './employeed-create-page.component.html',
})
export class EmployeedCreatePageComponent { }
