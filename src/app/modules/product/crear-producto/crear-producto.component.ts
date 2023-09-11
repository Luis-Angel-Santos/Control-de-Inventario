import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../shared/services/category.service';
import { CategoryElement } from '../../interfaces/category-element';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent {

  public productForm!: FormGroup;
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  public categories: CategoryElement[] = [];
  public selectedFile!: any;
  public imageName: string = "";

  ngOnInit(): void {

    this.getAllCategories();
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });
    if(this.data != null){
      this.updateForm(this.data);
    }


  }

  getAllCategories(){
    this.categoryService.getCategories().subscribe({
      next: (resp: any) => {
        this.categories = resp.categoryResponse.category;
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          title: 'Opps parece que algo salio mal :(',
          text: 'No se pudo obtener las categorias',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

  save(){

    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      quantity: this.productForm.get('quantity')?.value,
      category: this.productForm.get('category')?.value,
      image: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('image', data.image, data.image.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('quantity', data.quantity);
    uploadImageData.append('categoryId', data.category)

    if(this.data != null){
      this.productService.updateProduct(uploadImageData, this.data.id).subscribe({
        next: (resp: any) => {
          this.dialogRef.close(1);
        },
        error: (error) => {
          this.dialogRef.close(2);
        }
      });
    }else{
      this.productService.createProduct(uploadImageData).subscribe({
        next: (resp: any) => {
          this.dialogRef.close(1);
        },
        error: (error) => {
          this.dialogRef.close(2);
        }
      });
    }

  }

  updateForm(data: any){
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      quantity: [data.quantity, Validators.required],
      category: [data.category.id, Validators.required],
      image: ['', Validators.required]
    });
  }

  cancel(){
    this.dialogRef.close(3);
  }

  onFileChanged(event: any){

    this.selectedFile = event.target.files[0];
    this.imageName = this.selectedFile.name;

  }

}
