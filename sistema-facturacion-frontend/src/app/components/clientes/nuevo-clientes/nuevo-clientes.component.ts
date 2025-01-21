import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/service/clientes.service';
import { soloTexto, validarCorreo } from 'src/app/validators/validador';

@Component({
  selector: 'app-nuevo-clientes',
  templateUrl: './nuevo-clientes.component.html',
  styleUrls: ['./nuevo-clientes.component.css']
})
export class NuevoClientesComponent implements OnInit {

  formulario: FormGroup;
  existe: boolean = false;
  constructor(private formBuilder: FormBuilder, private clientesService: ClientesService) {
    this.formulario = this.formBuilder.group({
      nitCi: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(15)]],
      nombre: ['', [Validators.required, soloTexto()]],
      direccion: ['', [Validators.required]],
      correo: ['', [Validators.required, validarCorreo()]],
      activo: [1],
    });
  }

  ngOnInit(): void {
  }


  enviarDatos() {

    if (this.formulario.valid) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.clientesService.adicionarCliente(this.formulario.value).subscribe(response => {
      console.log('Datos enviados correctamente:', response);
      alert('Datos registrados correctamente');
      this.formulario.reset();
    }, error => {
      console.error('Error al enviar datos:', error);
      alert('Error al enviar datos: los campos no cumplen con los formatos requeridos');
    });
  }

  validarCodigo(event: any) {
    const input = event.target as HTMLInputElement;

    // Eliminar cualquier validación anterior
    //this.formulario.get('codigo')!.setErrors(null);
    this.existe = false;

    const delay = 300;

    setTimeout(() => {
      this.clientesService.verificarExistencia(input.value).subscribe(data => {
        if ( parseInt(data.mensaje) > 0 ) {
          this.existe = true;
          console.log('El código ya existe', data.mensaje);

          this.formulario.get('nitCi')!.setErrors({ 'codigoExistente': true });
        } else {
          this.formulario.get('nitCi')!.setErrors(null);
          this.existe = false;
        }
      });
    }, delay);
  }
}
