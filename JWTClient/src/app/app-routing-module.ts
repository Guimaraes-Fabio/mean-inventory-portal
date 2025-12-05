import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { ProductDetails } from './product-details/product-details';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'products/detail/:id', component: ProductDetails, canActivate: [authGuard] },
  { path: 'products/create', component: ProductDetails, canActivate: [authGuard] },
  { path: 'signup', component: Signup},
  { path: 'login', component: Login}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
