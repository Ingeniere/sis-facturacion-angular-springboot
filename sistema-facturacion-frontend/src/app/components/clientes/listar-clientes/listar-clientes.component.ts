import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: any ;
  personaEditar: any;
  filtroClientes: any;
  modoOculto: boolean = true;

  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.listaClientes();
  }

  listaClientes(){
    this.clientesService.listarClientes().subscribe(data => {
      this.clientes = data;
      this.filtroClientes = data;
      console.log(this.clientes)
    })
  }

  eliminarPorId(id: number) {
    console.log(id)
    this.clientesService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Persona eliminada correctamente');
      this.listaClientes();
    }, error => {
      console.error('Error al eliminar persona:', error);
    });
  }
  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    console.log(input.value);
    console.log(this.clientes);
    this.filtroClientes = this.clientes.filter( (cleinte: any) =>
      cleinte.idCliente.toString().includes(input.value.toLowerCase()) ||
      cleinte.nitCi.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.nombre.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.direccion.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.correo.toLowerCase().includes(input.value.toLowerCase())
    );
    console.log(this.filtroClientes)
  }

  toggleModoEdicion(persona: any) {
    this.personaEditar = persona;
    this.editarModoOcuto()
    console.log("algoooo*", this.personaEditar);
  }

  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.listaClientes();
  }

}
