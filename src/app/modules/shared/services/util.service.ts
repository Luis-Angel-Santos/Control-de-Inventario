import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {


  constructor() { }

  getRoles(){

  }

  isAdmin(): boolean{
    return true;
  }

}
