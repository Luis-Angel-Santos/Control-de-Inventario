import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductElement } from '../../interfaces/product-element';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{

  private productService = inject(ProductService);
  public displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'category', 'image', 'actions'];
  public dataSource = new MatTableDataSource<ProductElement>();
  public categoryEncontrado!: boolean;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe({
      next:(data) => {
        this.processProductsResponse(data);
        console.log(data);

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
      console.log(listProducts);

      listProducts.forEach((element: ProductElement) => {
        element.category.name = element.category.name
        element.image = 'data:image/jpeg;base64,' + element.image;
        dateProduct.push(element);
      });
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;
    }

  }

}
