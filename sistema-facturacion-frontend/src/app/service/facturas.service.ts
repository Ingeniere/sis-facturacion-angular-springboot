import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  private Url_Base: string = environment.ApiUrl;

  constructor(private httpCliente:HttpClient) { }

  listarFacturados(){
    return this.httpCliente.get(`${this.Url_Base}/cont-factura`);
  }
  guardarContenidoFactura(cabecera: any) {
    return this.httpCliente.post(`${this.Url_Base}/cont-factura`, cabecera);
  }

  guardarDetallesFactura(detalles: any) {
    return this.httpCliente.post(`${this.Url_Base}/detalle-factura/guardar`, detalles);
  }
  generaFactura(){
    return this.httpCliente.get(`${this.Url_Base}/cont-factura/genera-factura`);
  }

  eliminarPorId(id: number) {
    return this.httpCliente.delete(`${this.Url_Base}/cont-factura/${id}`);
  }
}
