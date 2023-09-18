import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CategoryService } from '../../../shared/services/category.service';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryElement } from 'src/app/modules/interfaces/category-element';
import { MatDialog } from '@angular/material/dialog';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';
import Swal from 'sweetalert2';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/modules/shared/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);
  private utilService = inject(UtilService);
  public dialog = inject(MatDialog);
  public displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  public dataSource = new MatTableDataSource<CategoryElement>();
  public categoryEncontrado!: boolean;
  public isAdmin!: boolean;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  ngOnInit(): void {
    this.getCategories();
    this.utilService.getRoles();
  }

  getCategories(): void{

    this.categoryService.getCategories().subscribe({
      next:(data) => {
        this.processCategoriesResponse(data);
      },
      error: (err) => {
        Swal.fire({
          title: 'Opps parece que algo salio mal :(',
          text: err.statusText,
          icon: 'error',
          showConfirmButton: false,
        });
      }
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
      this.dataSource.paginator = this.paginator;
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
          title: 'Opps parece que algo salio mal :(',
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
      width: '450px',
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
          title: 'Opps parece que algo salio mal :(',
          text: 'No se pudo actualizar la categoria, por favor intenta de nuevo.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

  }

  delete(id: number){

    const dialogRef = this.dialog.open( ConfirmComponent, {
      data: { id: id, module: "category" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        Swal.fire({
          title: 'Bien :)',
          text: 'La categoria se ha eliminado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
        this.getCategories();
      }else if(result == 2){
        Swal.fire({
          title: 'Opps parece que algo salio mal :(',
          text: 'No se pudo eliminar la categoria, por favor intenta de nuevo.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

  }

  buscar(termino: string){

    if(termino.length === 0){
      this.categoryEncontrado = true;
      return this.getCategories();
    }else{
      this.categoryService.getCategoryById(termino).subscribe({
        next:(value) => {
            this.processCategoriesResponse(value);
            this.categoryEncontrado = true;
        },
        error:(err) => {
          this.categoryEncontrado = false;
        },
      })
    }

  }

}
