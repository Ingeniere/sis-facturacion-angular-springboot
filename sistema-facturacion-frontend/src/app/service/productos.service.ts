import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaDatos } from '../interface/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private Url_Base: string = environment.ApiUrl;

    constructor(private httpCliente:HttpClient) { }

    listarProductos(): Observable<any> {
      return this.httpCliente.get<any>(`${this.Url_Base}/producto`);
    }

    adicionarProductos(datos: any) {
      return this.httpCliente.post(`${this.Url_Base}/producto/guardar`, datos);
    }

    eliminarPorId(id: number) {
      const url = `${this.Url_Base}/producto/eliminar/${id}`;
      return this.httpCliente.delete(url);
    }

    actualizarProducto(datos: any) {
      return this.httpCliente.put(`${this.Url_Base}/producto/actualizar`, datos);
    }

    verificarExistencia(cod: string) {
      return this.httpCliente.get<RespuestaDatos>(`${this.Url_Base}/producto/verificar-cod-producto/${cod}`);
    }
    disminuirStock(detalles: any) {
      return this.httpCliente.post(`${this.Url_Base}/producto/disminuir-stock`, detalles);
    }

}
