import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService:LoginService,
              private router:Router
  ){}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    //const urlActual = this.router.url;//aqui estamos haciendo referencia a la URL actual donde entre

    if(!token){
      //Si está autenticado y trata de acceder a /login, redirige a /app/cliente
      this.router.navigate(['/login']);
      return false;
    }
    else{

      return true;
    }
    
    }


}
