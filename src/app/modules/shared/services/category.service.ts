import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private http = inject(HttpClient);
  private endPoint: string = `${environment.baseUrl}/categories`;

  //obtener todas las categorias
  getCategories(){
    return this.http.get(this.endPoint);
  }

  //crear nueva categoria
  createCategory(body: any){
    return this.http.post(this.endPoint, body);
  }

  //editar categoria
  updateCategory(body: any, id: any){
    return this.http.put(`${this.endPoint}/id`, body);
  }

  //eliminar una categoria
  deleteCategory(id: number){
    return this.http.delete(this.endPoint);
  }

}
