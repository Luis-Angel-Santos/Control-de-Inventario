import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import Swal from 'sweetalert2';

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
    const request = {
      email: this.formularioLogin.value.email,
      password: this.formularioLogin.value.password
    };
    this.userService.login(request).subscribe({
      next: (data: any) => {
        this.mostrarLoading = false;
        if(data.status == 200){
          localStorage.setItem('user', JSON.stringify(data.user));
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error: any) => {
        this.mostrarLoading = false;
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });

  }

}
