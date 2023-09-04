import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryElement } from 'src/app/modules/interfaces/category-element';
import { MatDialog } from '@angular/material/dialog';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  public dataSource = new MatTableDataSource<CategoryElement>();

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void{

    this.categoryService.getCategories().subscribe({
      next:(data) => {
        this.processCategoriesResponse(data);
      },
      error(err) {
        Swal.fire({
          title: 'Opps parerce que algo salio mal :(',
          text: err.message,
          icon: 'error',
          showConfirmButton: false,
        });
      },
    });

  }

  processCategoriesResponse(resp: any){

    const dataCategory: CategoryElement[] = [];
    if(resp.metadata[0].code == "1"){
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }

  }

  openCategoryDialog(){

    const dialogRef = this.dialog.open( CrearCategoriaComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        Swal.fire({
          title: 'Bien :)',
          text: 'La nueva categoria se ha guardado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
        this.getCategories();
      }else if(result == 2){
        Swal.fire({
          title: 'Opps parerce que algo salio mal :(',
          text: 'No se pudo crear la nueva categoria, por favor intenta de nuevo.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

  }

  edit(id: number, name: string, description: string){

    const dialogRef = this.dialog.open( CrearCategoriaComponent, {
      data: { id: id, name: name, description: description }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        Swal.fire({
          title: 'Bien :)',
          text: 'La categoria se ha actualizado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
        this.getCategories();
      }else if(result == 2){
        Swal.fire({
          title: 'Opps parerce que algo salio mal :(',
          text: 'No se pudo actualizar la categoria, por favor intenta de nuevo.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

  }

}
