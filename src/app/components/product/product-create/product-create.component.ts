import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor (private productService: ProductService, private router: Router) {}

  product: Product = {
    name: "",
    description: "",
    price: 0
  }

  ngOnInit(): void {

  }

  createProduct () {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage("Success!")
      this.router.navigate(['/products'])
    })
  }

  cancel () {
    this.router.navigate(['/products'])
  }

}
