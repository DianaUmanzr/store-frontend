import { ProductEditComponent } from './views/product/product-edit/product-edit.component';
import { ProductComponent } from './views/product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'product', component: ProductComponent, children: [
      { path: 'new', component: ProductEditComponent },
      { path: 'edit-product/:id', component: ProductEditComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
