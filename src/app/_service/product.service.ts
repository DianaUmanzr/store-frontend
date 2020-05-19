import { MatTableDataSource } from '@angular/material/table';
import { Product } from './../_model/product';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productChange = new Subject<Product[]>();

  selectedProduct = new BehaviorSubject({
    id : 0,
    name : '',
    price : '0',
    stock : '0'
  });
  
  
  url: string = `${environment.HOST}/api/products/`;


  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Product[]>(this.url);
  }

  addProduct(product : Product){
    return this.http.post(this.url,product);
  }

  updateProduct(product: Product){
    return this.http.put(this.url, product);
  }

  deleteProduct(id : number){
    return this.http.delete(`${this.url}/${id}`);
  }
}
