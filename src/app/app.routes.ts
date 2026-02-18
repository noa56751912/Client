import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { ProductsPageComponent } from './component/products-page/products-page';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'products-page', component: ProductsPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
