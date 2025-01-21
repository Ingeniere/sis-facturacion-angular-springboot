import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginGuard } from './guards/login.guard';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  {
    path:'',
    component:MenuComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'app',
    component: MenuComponent,
    canActivate: [LoginGuard],
    loadChildren:()=> import('./page/page.module').then(m=>m.PageModule)
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
