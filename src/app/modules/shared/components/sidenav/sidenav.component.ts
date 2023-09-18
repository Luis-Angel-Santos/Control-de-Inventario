import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  private keyCloakService = inject(KeycloakService);
  public username!: string;
  public media = inject(MediaMatcher);
  public mobileQuery: MediaQueryList;
  menuNav = [
    {name: 'Home', route: 'home', icon: 'home'},
    {name: 'Categorias', route: 'category', icon: 'category'},
    {name: 'Productos', route: 'product', icon: 'production_quantity_limits'},
  ];

  constructor(){
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {

  }

  logout(){
    this.keyCloakService.logout();
  }

}
