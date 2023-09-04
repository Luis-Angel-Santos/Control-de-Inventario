import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit{

  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {

    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    if(this.data != null){
      this.updateForm(this.data);
    }

  }

  save(){

    let data = {
      name: this.categoryForm.get('name')?.value,
      description: this.categoryForm.get('description')?.value
    }

    if(this.data != null){
      this.categoryService.updateCategory(data, this.data.id).subscribe({
        next:(resp) => {
          this.dialogRef.close(1);
        },
        error: (error) => {
          this.dialogRef.close(2);
        }
      });
    }else{
      this.categoryService.createCategory(data).subscribe({
        next:(resp) => {
          this.dialogRef.close(1);
        },
        error: (error) => {
          this.dialogRef.close(2);
        }
      });
    }

  }

  cancel(){
    this.dialogRef.close(3);
  }

  updateForm(data: any){

    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required]
    });

  }

}
