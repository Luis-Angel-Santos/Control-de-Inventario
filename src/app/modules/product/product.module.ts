import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ProductComponent } from './product/product.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';

@NgModule({
  declarations: [
    ProductComponent,
    CrearProductoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProductModule { }
