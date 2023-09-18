import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import Swal from 'sweetalert2';
import { UserElement } from '../../interfaces/user-element';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  formularioLogin!: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(){
    this.mostrarLoading = true;
    const datosUser = new FormData();
    datosUser.append('email', this.formularioLogin.get('email')?.value);
    datosUser.append('password', this.formularioLogin.get('password')?.value);
    this.userService.login(datosUser).subscribe({
      next: (data: any) => {
        this.mostrarLoading = false;
        console.log(data);
        const datosUserLogin: UserElement = {
          id: data.userResponse.user[0].id,
          name: data.userResponse.user[0].name,
          email: data.userResponse.user[0].email,
          role: data.userResponse.user[0].role
          //token: data.token     TODO: implementar jwt
        };
        localStorage.setItem('user', JSON.stringify(datosUserLogin));
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        this.mostrarLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'Correo o contraseña incorrecta. Por favor verificalo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });

  }

}
