import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateEntityFormComponent } from '../../components';

@Component({
  selector: 'app-create-entity-page',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CreateEntityFormComponent
  ],
  templateUrl: './create-entity-page.component.html',
})
export class CreateEntityPageComponent {}
