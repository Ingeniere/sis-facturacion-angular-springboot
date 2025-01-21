import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Url_Base: string = environment.ApiUrl + '/facturacion/login';

  constructor(private httpCliente:HttpClient) { }

  login(nomUsuario: string, password: string): Observable<any>{
    const parametro = {nombreUsuario: nomUsuario, password: password}

    return this.httpCliente.get<any>(this.Url_Base, {
      params: parametro
    }).pipe(
      tap(response=>{
        if(response.codigo ==200){
          localStorage.setItem('token', response.codigo)
        }
      })
    )
  }
}
