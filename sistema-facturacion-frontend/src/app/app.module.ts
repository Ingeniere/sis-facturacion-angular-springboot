import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarClientesComponent } from './components/clientes/listar-clientes/listar-clientes.component';
import { EditarClientesComponent } from './components/clientes/editar-clientes/editar-clientes.component';
import { NuevoClientesComponent } from './components/clientes/nuevo-clientes/nuevo-clientes.component';
import { Error404Component } from './components/error404/error404.component';
import { ContenidoFacturaComponent } from './components/facturas/contenido-factura/contenido-factura.component';
import { ListadoFacturasComponent } from './components/facturas/listado-facturas/listado-facturas.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListarProductosComponent } from './components/productos/listar-productos/listar-productos.component';
import { EditarProductosComponent } from './components/productos/editar-productos/editar-productos.component';
import { NuevoProductosComponent } from './components/productos/nuevo-productos/nuevo-productos.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClienteComponent } from './page/cliente/cliente.component';
import { ProductoComponent } from './page/producto/producto.component';
import { FacturaComponent } from './page/factura/factura.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductoComponent,
    ListarClientesComponent,
    FacturaComponent,
    EditarClientesComponent,
    NuevoClientesComponent,
    Error404Component,
    ContenidoFacturaComponent,
    ListadoFacturasComponent,
    MenuComponent,
    ListarProductosComponent,
    EditarProductosComponent,
    NuevoProductosComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
