import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaDatos } from '../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private Url_Base: string = environment.ApiUrl;

  constructor(private httpCliente:HttpClient) { }

  listarClientes(): Observable<any> {
    return this.httpCliente.get<any>(`${this.Url_Base}/clientes`);
  }

  adicionarCliente(datos: any) {
    return this.httpCliente.post(`${this.Url_Base}/clientes/guardar`, datos);
  }

  eliminarPorId(id: number) {
    const url = `${this.Url_Base}/clientes/eliminar/${id}`;
    return this.httpCliente.delete(url);
  }

  actualizarCliente(datos: any) {
    return this.httpCliente.put(`${this.Url_Base}/clientes/actualizar`, datos);
  }
  verificarExistencia(codigo: string) {
    return this.httpCliente.get<RespuestaDatos>(`${this.Url_Base}/clientes/verificar-cliente/${codigo}`);
  }
}
