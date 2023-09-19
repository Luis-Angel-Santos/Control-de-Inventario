import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserElement } from 'src/app/modules/interfaces/user-element';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit{

  private userService = inject(UserService);
  public user!: UserElement;
  public media = inject(MediaMatcher);
  public mobileQuery: MediaQueryList;
  menuNav = [
    {name: 'Inicio', route: 'home', icon: 'home'},
    {name: 'Categorias', route: 'category', icon: 'category'},
    {name: 'Productos', route: 'product', icon: 'production_quantity_limits'},
  ];

  constructor(){
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  logout(){
    Swal.fire({
      title: '¿Desea cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result)=>{
      if(result.isConfirmed){
        Swal.fire({
          title: 'Sesión cerrada',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(()=>{
          this.userService.logout();
        });
      }
    });
  }

}
