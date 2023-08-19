import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ProductComponent } from './views/product/product.component';
import { ProductCreateComponent } from './components/product/product-create/product-create.component';
import { MapComponent } from './views/map/map.component';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: MapComponent
  },
  {
    path: "products",
    component: ProductComponent
  },
  {
    path: "products/create",
    component: ProductCreateComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
