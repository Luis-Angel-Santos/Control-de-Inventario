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

}
