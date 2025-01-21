import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ClientesService } from 'src/app/service/clientes.service';
import { FacturasService } from 'src/app/service/facturas.service';
import { ProductosService } from 'src/app/service/productos.service';
import { cantidadMayorQueCero } from 'src/app/validators/validador';

@Component({
  selector: 'app-contenido-factura',
  templateUrl: './contenido-factura.component.html',
  styleUrls: ['./contenido-factura.component.css']
})
export class ContenidoFacturaComponent implements DoCheck {

  clientes: any[] = [];
  productos: any[] = [];
  datosCabecera: any = {};
  clienteSeleccionado: any;
  productoSeleccionado: any;
  formulario: FormGroup;
  productosForm!: FormGroup;
  listProductos: any[] = [];
  modoOculto: boolean = true;

  subtotal: number = 0;
  porcentajeIva: number = 12;
  iva: number = 0;
  total: number = 0;
  stockProducto = '';
  hayStock = true;

  constructor(
              private formBuilder: FormBuilder,
              private clienteComponent: ClientesService,
              private facturasService: FacturasService,
              private productoService: ProductosService
              ) {
    this.formulario = this.formBuilder.group({
      numeroFactura: ['', [Validators.required]],
      cliente: ['', [Validators.required, ]],
      ruc: ['', [Validators.required ]],
      razonSocial: ['', [Validators.required, ]],
      correo: ['', [Validators.required, ]],

    });

    this.productosForm = this.formBuilder.group({
      codProducto: ['', [Validators.required]],
      nombreProducto: ['', [Validators.required]],
      precioProducto: ['', [Validators.required, ]],
      cantidadProducto: [1, [Validators.required, cantidadMayorQueCero() ]],
    });
  }
  ngDoCheck(){
    this.validarFormularios();
  }

  ngOnInit(): void {
    this.generarFactura();
  }

  enviarDatos() {

    if (this.formulario.valid ) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      this.formulario.markAllAsTouched();
      return;
    }


    console.log('Etrasssx...');

    this.formulario.patchValue({
      ruc: this.clienteSeleccionado.nitCi,
      razonSocial: this.clienteSeleccionado.nombre,
      correo: this.clienteSeleccionado.correo
    });

    const datosEnviar = {
      "numeroFactura": this.formulario.value.numeroFactura,
      "ciCliente": this.formulario.value.ruc,
      "subtotal": this.subtotal,
      "iva": this.iva,
      "total": this.total
    };
    console.log("Datos a enviar", datosEnviar)

    this.facturasService.guardarContenidoFactura(datosEnviar)
    .pipe(
      switchMap( (respuesta: any) => {
      console.log(this.listProductos)
      const productosParaGuardar = this.listProductos.map(producto => {
        return {
          codigoProducto: producto.codProducto,
          cantidad: producto.cantidadProducto,
          pkContFactura: respuesta.idFcatura,
        };
      });
      return this.facturasService.guardarDetallesFactura(productosParaGuardar);
      }),
      switchMap((responseDetalles: any) => {
        const productosDisminuirStock = this.listProductos.map(producto => {
          return {
            "codigoProducto": producto.codProducto,
            "cantidad": producto.cantidadProducto
          };
        });
        console.log("stock a disminuir", productosDisminuirStock)
        return this.productoService.disminuirStock(productosDisminuirStock);
      })

      )
    .subscribe(response => {
      console.log('Datos enviados correctamente:', response);
      alert('Datos registrados correctamente');
      this.formulario.reset();
      this.generarFactura();
      this.clienteSeleccionado = null;
      this.resetListProductos();
    }, error => {
      console.error('Error al enviar datos:', error);
      alert('Error al enviar datos: los campos no cumplen con los formatos requeridos');
    });
  }

  resetListProductos(): void {
    this.listProductos = [];
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
  }

  generarFactura(){
    this.facturasService.generaFactura().subscribe(
      (resp: any) => {
        console.log("aqui se genera la factura automaticamente desde 1 para arriba",resp.mensaje)
        this.formulario.patchValue({
          numeroFactura: resp.mensaje
        })
      }
    )
  }


  listarClientes() {
    if(this.clientes.length != 0){
      return;
    }
    this.clienteComponent.listarClientes().subscribe(data => {
      this.clientes = data;
    })
  }

  seleccionarCliente(idCliente: any): void{

    this.clienteSeleccionado = this.clientes.find(cliente => cliente.idCliente == idCliente.value);
  }

  cambiarModoOculto(){
    this.modoOculto = !this.modoOculto;
  }

  agregarProducto(){
    if (this.productosForm.valid) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      Object.values(this.productosForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.listProductos.push(this.productosForm.value);
    this.productosForm.reset();
    this.productoSeleccionado = null;
    this.productosForm.get('cantidadProducto')?.setValue(1);
    console.log("prod select ",this.productoSeleccionado);
    console.log("lista de prod ",this.listProductos);

    this.subtotal = this.listProductos.reduce((total, producto) => total + producto.precioProducto, 0);

    this.calcularValores(this.listProductos);
  }

  calcularValores( list: any){
    this.subtotal = list.reduce((total: any, producto: any) => total + (producto.precioProducto * producto.cantidadProducto), 0);
    this.iva = this.subtotal * (this.porcentajeIva / 100);
    this.total = this.subtotal + this.iva;
  }

  eliminarPorId(producto: any) {
    const indice = this.listProductos.indexOf(producto);
    if (indice !== -1) {
      this.listProductos.splice(indice, 1);
      this.calcularValores(this.listProductos);
    }
  }


  listarProductos() {
    if(this.productos.length != 0){
      return;
    }
    this.productoService.listarProductos().subscribe(data => {
      this.productos = data;
    })
  }
  seleccionarProdcuto(idProducto: any): void{
    this.productoSeleccionado = this.productos.find( producto => producto.codigo == idProducto.value);
    this.stockProducto = this.productoSeleccionado.stock;
    this.productosForm.patchValue({
      nombreProducto: this.productoSeleccionado.nombre

    });

  }



  validarFormularios(){
    if (this.clienteSeleccionado) {
      this.formulario.patchValue({
        ruc: this.clienteSeleccionado.nitCi,
        razonSocial: this.clienteSeleccionado.nombre,
        correo: this.clienteSeleccionado.correo
      });
    } else {
      // Si no hay cliente seleccionado, se deben borrar los valores y marcar los campos como inválidos
      this.formulario.patchValue({
        ruc: '',
        razonSocial: '',
        correo: ''
      });
      this.formulario.get('ruc')?.setValidators(Validators.required);
      this.formulario.get('razonSocial')?.setValidators(Validators.required);
      this.formulario.get('correo')?.setValidators(Validators.required);
    }

    console.log("----prod select", this.productoSeleccionado)

    if (this.productoSeleccionado) {
      this.productosForm.patchValue({
        nombreProducto: this.productoSeleccionado.nombre,
        precioProducto: this.productoSeleccionado.precio,

      });
    } else {
      // Si no hay cliente seleccionado, se deben borrar los valores y marcar los campos como inválidos
      this.productosForm.patchValue({
        nombreProducto: '',
        precioProducto: '',

      });
      this.productosForm.get('nombreProducto')?.setValidators(Validators.required);
      this.productosForm.get('precioProducto')?.setValidators(Validators.required);

    }

    // Actualizar la validación de los campos
    this.formulario.get('ruc')?.updateValueAndValidity();
    this.formulario.get('razonSocial')?.updateValueAndValidity();
    this.formulario.get('correo')?.updateValueAndValidity();

     // Actualizar la validación de los campos
     this.productosForm.get('nombreProducto')?.updateValueAndValidity();
     this.productosForm.get('precioProducto')?.updateValueAndValidity();

  }

  validarStock($event: any){
    if ($event.target.value > this.stockProducto) {

      //this.productosForm.get('cantidadProducto')?.setValue(this.stockProducto);
      console.log("el stock es ",this.stockProducto);
      this.productosForm.get('cantidadProducto')?.markAsTouched();
      this.productosForm.get('cantidadProducto')?.setErrors({ 'stockExcedido': true });
      this.hayStock = false;
      return;
    }else{
      this.productosForm.get('cantidadProducto')?.setErrors(null);
      this.hayStock = true;

    }
  }

}
