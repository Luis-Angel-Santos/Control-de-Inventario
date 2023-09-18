import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient);
  private endPoint: string = `${environment.baseUrl}/user`;

  //validar usuario
  login(user: any){
    return this.http.post(`${this.endPoint}/validate`, user);
  }

  //crear un usuario
  createUser(user: any){
    return this.http.post(this.endPoint, user);
  }

  //eliminar un usuario por id
  deleteUser(id: number){
    return this.http.delete(`${this.endPoint}/delete/${id}`);
  }


}
