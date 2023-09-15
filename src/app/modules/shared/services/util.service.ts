import { Injectable, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private keycloakService = inject(KeycloakService);

  constructor() { }

  getRoles(){
    return this.keycloakService.getUserRoles();
  }

  isAdmin(): boolean{
    let roles = this.keycloakService.getUserRoles().filter( role => role == 'admin');
    return roles.length > 0;
  }

}
