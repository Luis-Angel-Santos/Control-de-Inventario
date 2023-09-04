import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { CategoryComponent } from './components/category/category.component';
import { CrearCategoriaComponent } from './components/crear-categoria/crear-categoria.component';

@NgModule({
  declarations: [
    CategoryComponent,
    CrearCategoriaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class CategoryModule { }
