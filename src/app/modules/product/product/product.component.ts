import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from '../../interfaces/product-element';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CrearProductoComponent } from '../crear-producto/crear-producto.component';
import { CategoryElement } from '../../interfaces/category-element';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  private productService = inject(ProductService);
  private utilService = inject(UtilService);
  public dialog = inject(MatDialog);
  public displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category', 'image', 'actions'];
  public dataSource = new MatTableDataSource<ProductElement>();
  public productEncontrado!: boolean;
  public isAdmin!: boolean;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next:(data) => {
        this.processProductsResponse(data);
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

  processProductsResponse(resp: any){

    const dateProduct: ProductElement[] = [];
    if(resp.metadata[0].code == '1'){
      let listProducts = resp.product.products;
      listProducts.forEach((element: ProductElement) => {
        element.category.name = element.category.name
        element.image = 'data:image/jpeg;base64,' + element.image;
        dateProduct.push(element);
      });
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }

  }

  openProductDialog(){

    const dialogRef = this.dialog.open(CrearProductoComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        Swal.fire({
          title: 'Bien :)',
          text: 'El producto se ha guardado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
        this.getProducts();
      }else if(result == 2){
        Swal.fire({
          title: 'Opps parece que algo salio mal :(',
          text: 'No se pudo crear el producto, por favor intenta de nuevo.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

  }

  edit(id: number, name: string, price: number, quantity: number, category: CategoryElement){

    const dialogRef = this.dialog.open(CrearProductoComponent, {
      width: '450px',
      data: {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        category: category
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        Swal.fire({
          title: 'Bien :)',
          text: 'El producto se ha editado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
        this.getProducts();
      }else if(result == 2){
        Swal.fire({
          title: 'Opps parece que algo salio mal :(',
          text: 'No se pudo editar el producto, por favor intenta de nuevo.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

  }

  delete(productId: number){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {
        id: productId,
        module: "product"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == 1){
        Swal.fire({
          title: 'Bien :)',
          text: 'El producto se ha eliminado correctamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000
        });
        this.getProducts();
      }else if(result == 2){
        Swal.fire({
          title: 'Opps parece que algo salio mal :(',
          text: 'No se pudo eliminar el producto, por favor intenta de nuevo.',
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });

  }

  buscar(name: string){

    if(name.length == 0){
      this.productEncontrado = true;
      return this.getProducts();
    }
    this.productService.getProductByName(name).subscribe({
      next:(data) => {
        this.productEncontrado = true;
        this.processProductsResponse(data);
      },
      error: (err) => {
        this.productEncontrado = false;
      }
    });

  }

}
