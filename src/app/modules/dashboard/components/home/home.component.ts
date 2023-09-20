import { Component, OnInit, inject } from '@angular/core';
import { ProductElement } from 'src/app/modules/interfaces/product-element';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public chartBar: any;
  public chartDonut: any;
  private productService = inject(ProductService);

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

    const nameProduct: string[] = [];
    const quantityProduct: number[] = [];

    if(resp.metadata[0].code == '1'){
      let listProducts = resp.product.products;
      listProducts.forEach((element: ProductElement) => {
        nameProduct.push(element.name);
        quantityProduct.push(element.quantity);
      });

      this.chartBar = new Chart('canvas-bar', {
        type: 'bar',
        data:{
          labels: nameProduct,
          datasets: [
            {
              label: 'Stock',
              data: quantityProduct,
              borderWidth: 1
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y:{
              beginAtZero: true
            }
          }
        }
      });

      this.chartDonut = new Chart('canvas-donut', {
        type: 'doughnut',
        data:{
          labels: nameProduct,
          datasets: [
            {
              label: 'Stock',
              data: quantityProduct
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
        }
      });

    }

  }


}
