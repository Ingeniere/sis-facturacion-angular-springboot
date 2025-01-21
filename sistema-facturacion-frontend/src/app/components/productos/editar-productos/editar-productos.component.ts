import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/service/productos.service';
import { soloTexto, validarDecimalConDosDecimales } from 'src/app/validators/validador';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent implements OnInit {

  @Input() productosEditar: any = {};
  @Output() modoOculto = new EventEmitter();
  personaForm: FormGroup;

  constructor(private fb: FormBuilder, private productoService: ProductosService) {
    this.personaForm = this.fb.group({
      idProducto: '',
      codigo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      nombre: ['', [Validators.required, soloTexto()]],
      precio: ['', [Validators.required, validarDecimalConDosDecimales()]],
      stock: ['', [Validators.required, validarDecimalConDosDecimales()]],
      activo: [1],
      fechaCreacion: ['', [Validators.required]],
    });

    console.log("constructor", this.productosEditar);

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productosEditar'] && this.productosEditar) {
      this.personaForm.patchValue(this.productosEditar);
    }
    console.log("onchange", this.productosEditar);
  }


  guardar(): void {

    const valoresFormulario = this.personaForm.value;
    console.log("Persona ", this.productosEditar?.nombre);
    console.log("Persona editada", valoresFormulario);

    if (this.personaForm.valid) {

      console.log('El formulario es válido. Enviar solicitud...');
    } else {

      Object.values(this.personaForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.productoService.actualizarProducto(valoresFormulario).subscribe(
      response => {
        console.log('Persona editada correctamente:', response);
        alert('Producto editado correctamente');
        this.modoOculto.emit();
        // window.location.reload();

      },
      error => {
        console.error('Error al editar producto:', error);
        alert('Error al editar producto: los campos no cumplen con los formatos requeridos');
      }
    )
  }

}
