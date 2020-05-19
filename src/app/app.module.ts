import { ProductService } from 'src/app/_service/product.service';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './views/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductEditComponent } from './views/product/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductEditComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
    ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
