import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { NuevoClientesComponent } from '../components/clientes/nuevo-clientes/nuevo-clientes.component';
import { ProductoComponent } from './producto/producto.component';
import { NuevoProductosComponent } from '../components/productos/nuevo-productos/nuevo-productos.component';
import { FacturaComponent } from './factura/factura.component';
import { ListadoFacturasComponent } from '../components/facturas/listado-facturas/listado-facturas.component';

const routes: Routes = [
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'cliente/nuevo',
    component: NuevoClientesComponent
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'producto/nuevo',
    component: NuevoProductosComponent
  },
  {
    path: 'factura',
    component: FacturaComponent
  },
  {
    path: 'lista-factura',
    component: ListadoFacturasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
