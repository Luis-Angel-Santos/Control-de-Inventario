import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  private http = inject(HttpClient);
  private endPoint: string = `${environment.baseUrl}/products`;

  //obtener todos los productos
  getProducts(){
    return this.http.get(this.endPoint);
  }

  //crear un producto
  createProduct(product: any){
    return this.http.post(this.endPoint, product);
  }

  //actualizar un producto
  updateProduct(product: any, id: number){
    return this.http.put(`${this.endPoint}/${id}`, product);
  }

  //eliminar un producto por id
  deleteProduct(id: number){
    return this.http.delete(`${this.endPoint}/${id}`);
  }

}
