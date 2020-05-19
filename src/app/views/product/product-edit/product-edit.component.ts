import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/_service/product.service';
import { Product } from 'src/app/_model/product';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product : Product;
  form : FormGroup;
  id : number;
  edition : boolean;

  constructor(private route: ActivatedRoute,
    private router : Router,
    private productService : ProductService) {
      this.form = new FormGroup({
        'id' : new FormControl(0),
        'name' : new FormControl(''),
        'price' : new FormControl(0),
        'stock' : new FormControl(0)
      });  
     }
    public productObservable = new BehaviorSubject(null);

  ngOnInit(): void {
    this.productObservable = this.productService.selectedProduct;
    this.productObservable.subscribe(data => {
      console.log(data);
      if(data) {
      this.product = data;
      this.form.patchValue({
        id : data.id,
        name : data.name,
        price : data.price,
        stock : data.stock
      })
    }
    });

  this.route.params.subscribe((params: Params) => {
    this.id = params['id'];
    this.edition = params['id'] != null;
  });
}

ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this.productObservable.subscribe(data => {
    this.form.patchValue({
      id : data.id,
      name : data.name,
      price : data.price,
      stock : data.stock
    })
  });
}

  save(){
   this.product.id =this.form.value['id'];
   this.product.name =this.form.value['name'];
   this.product.price =this.form.value['price'];
   this.product.stock =this.form.value['stock'];
   this.productService.updateProduct(this.product).subscribe( () => {
   this.productService.list().subscribe(data => {
   this.productService.productChange.next(data);
      });
    });
    window.location.reload();
  }
}
