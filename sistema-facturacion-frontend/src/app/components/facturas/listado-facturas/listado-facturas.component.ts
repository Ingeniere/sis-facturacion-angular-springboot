import { Component, OnInit } from '@angular/core';
import { FacturasService } from 'src/app/service/facturas.service';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html',
  styleUrls: ['./listado-facturas.component.css']
})
export class ListadoFacturasComponent implements OnInit {

  facturas: any ;
  personaEditar: any;
  facturasFiltradas: any;
  modoOculto: boolean = true;

  constructor(private facturasService: FacturasService) {
  }

  ngOnInit(): void {
    this.listarLosFacturados();
  }

  listarLosFacturados(){
    this.facturasService.listarFacturados().subscribe(data => {
      this.facturas = data;
      this.facturasFiltradas = data;

    })
  }

  eliminarPorId(id: number) {
    console.log(id)
    this.facturasService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Persona eliminada correctamente');
      this.listarLosFacturados();
    }, error => {
      console.error('Error al eliminar persona:', error);
    });
  }
  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    console.log(this.facturasFiltradas)
    this.facturasFiltradas = this.facturas.filter( (factura: any) =>
      factura.idFcatura.toString().includes(input.value.toLowerCase()) ||
      factura.numeroFactura.toString().includes(input.value.toLowerCase()) ||
      factura.ciCliente.toString().includes(input.value.toLowerCase()) ||
     factura.subtotal.toString().includes(input.value.toLowerCase()) ||
     factura.iva.toString().includes(input.value.toLowerCase()) ||
     factura.total.toString().includes(input.value.toLowerCase())
    );
  }

}
