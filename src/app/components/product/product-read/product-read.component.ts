import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { Apollo } from 'apollo-angular';
import { GET_PRODUCTS } from 'src/app/graphql.queries';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: any[] = []
  error: any

  constructor (private productService: ProductService, private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_PRODUCTS
    }).valueChanges.subscribe(({ data, error }: any) => {
      console.log(data)
      this.products = data.findAllProducts
      this.error = error
    })
  }

}
