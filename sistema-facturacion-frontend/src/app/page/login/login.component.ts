import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensajeLogin: string = '';

  loginForm!: FormGroup ;

  constructor(private formBuilder: FormBuilder,
              private loginService:LoginService,
              private router: Router
  ) {
    if(localStorage.getItem('token')){
      this.router.navigate(['/app/cliente']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { nombreUsuario, password } = this.loginForm.value;

    this.loginService.login(nombreUsuario, password)
      .subscribe(
        response => {
          console.log('Inicio de sesión exitoso', response);
          const { codigo, mensaje } = response;

          console.log(codigo, mensaje, response.codigo);

          switch (response.codigo) {
            case 403:
              this.mensajeLogin = response.data;
              break;
            case 200:
              this.mensajeLogin = response.data;
              this.router.navigate(['/app/cliente']);
              console.log("ser")
              break;
            case 401:
              this.mensajeLogin = response.data;
              break;
            case 400:
              this.mensajeLogin = response.data;
              break;
            case 500:
              this.mensajeLogin = response.data;
              break;
            default:
              console.log('Error en inicio de sesión');
              break;
          }


        },
        error => {
          console.error('Error en inicio de sesión', error);
          if (error instanceof HttpErrorResponse) {
            console.error('Estado:', error.status);
            console.error('Texto:', error.statusText);
            // Muestra el mensaje de error al usuario
            alert(error.error);
          }
        }
      );



  }

}
