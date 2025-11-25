import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Products } from './products/products';
import { ProductDetails } from './product-details/product-details';
import { ProductSearch } from './product-search/product-search';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: Products },
  { path: 'products/detail/:id', component: ProductDetails },
  { path: 'products/create', component: ProductDetails },
  { path: 'products/search', component: ProductSearch },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
