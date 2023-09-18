import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private keycloakService = inject(KeycloakService);

  constructor() { }

  getRoles(){

  }

  isAdmin(): boolean{
    return true;
  }

}
