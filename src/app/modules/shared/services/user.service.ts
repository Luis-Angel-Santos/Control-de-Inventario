import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserElement } from '../../interfaces/user-element';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient);
  private router = inject(Router);
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

  //obtener datos del usuario del localStorage
  getUser(): UserElement{
    const user = JSON.parse(localStorage.getItem('user')!);
    let usuarioLogged: UserElement = user;

    return usuarioLogged;

  }

  //cerrar sesion
  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


}
