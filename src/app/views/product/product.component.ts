import { ProductService } from './../../_service/product.service';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_model/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Output() selectItem = new EventEmitter();
  form : FormGroup;
  product : Product;


  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['id','name','price','stock','accions'];
  @ViewChild(MatSort, {static:true}) sort :  MatSort;
  @ViewChild(MatPaginator, {static:true}) paginator :  MatPaginator;

  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.productService.productChange.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.productService.list().subscribe(data => 
      {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  filter(value: string){
    this.dataSource.filter = value.trim().toLowerCase();
  }

  getItem(selectItem){debugger
    this.productService.selectedProduct.next(selectItem);
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.productService.list().subscribe(data => {
        this.productService.productChange.next(data);
      });
    });
    window.location.reload();
  }
}
