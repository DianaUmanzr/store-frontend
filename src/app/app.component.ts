import { Product } from 'src/app/_model/product';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   
  product : Product;
  title = 'storeapp-frontend';

  getInformation(event){debugger
    this.product = event;
  }
}
