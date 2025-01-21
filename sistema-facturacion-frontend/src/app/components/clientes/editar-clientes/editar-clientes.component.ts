import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/service/clientes.service';
import { soloTexto, validarCorreo } from 'src/app/validators/validador';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  @Input() personaEditar: any = {};
  @Output() modoOculto = new EventEmitter();
  personaForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClientesService) {
    this.personaForm = this.fb.group({
      idCliente: '',
      nitCi: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*'), Validators.maxLength(15)]],
      nombre: ['', [Validators.required, soloTexto()]],
      direccion: ['', [Validators.required,]],
      correo: ['', [Validators.required, validarCorreo()]],
      activo: ['', [Validators.required]],
      fechaCreacion: ['', [Validators.required]],

    });

    console.log("constructor");

  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personaEditar'] && this.personaEditar) {
      this.personaForm.patchValue(this.personaEditar);
    }
    console.log("onchange");
  }


  guardar(): void {

    const valoresFormulario = this.personaForm.value;
    console.log("Persona ", this.personaEditar?.nombre);
    console.log("Persona editada", valoresFormulario);

    if (this.personaForm.valid) {

      console.log('El formulario es válido. Enviar solicitud...');
    } else {

      Object.values(this.personaForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.clienteService.actualizarCliente(valoresFormulario).subscribe(
      response => {
        console.log('Persona editada correctamente:', response);
        alert('Cliente editado correctamente');
        // window.location.reload();
        this.modoOculto.emit();
      },
      error => {
        console.error('Error al editar persona:', error);
        alert('Error al editar cliente: los campos no cumplen con los formatos requeridos');
      }
    )
  }

}
