import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/service/productos.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {

  productos: any ;
  productosEditar: any;
  filtroProductos: any;
  modoOculto: boolean = true;

  constructor(private productoService:ProductosService) { }

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos(){
    this.productoService.listarProductos().subscribe(data => {
      this.productos = data;
      this.filtroProductos = data;

    })
  }

  eliminarPorId(id: number) {
    console.log(id)
    this.productoService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Producto eliminada correctamente');
      this.listarProductos();
    }, error => {
      console.error('Error al eliminar producto:', error);
    });
  }
  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    console.log(this.filtroProductos);
    this.filtroProductos = this.productos.filter( (persona: any) =>
      persona.idProducto.toString().includes(input.value.toLowerCase()) ||
      persona.codigo.toLowerCase().includes(input.value.toLowerCase()) ||
      persona.nombre.toLowerCase().includes(input.value.toLowerCase()) ||
      persona.precio.toString().includes(input.value.toLowerCase()) ||
      persona.stock.toString().includes(input.value.toLowerCase()) ||
      persona.activo.toString().includes(input.value.toLowerCase())
    );
    console.log(this.filtroProductos)
  }

  toggleModoEdicion(persona: any) {
    this.productosEditar = persona;
    this.editarModoOcuto()
    console.log("algoooo*", this.productosEditar);
  }

  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.listarProductos();
  }

}
