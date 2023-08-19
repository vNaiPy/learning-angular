import { Apollo } from 'apollo-angular';
import { ProductService } from './../../product/product.service';
import { Component } from '@angular/core';
import { GET_PRODUCTS, GET_PRODUCTS_BY_ID } from 'src/app/graphql.queries';
import { Product } from '../../product/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchFor: string = ""
  searchControl = this.searchFor
  searchControlFlag = false

  products: Product[] = []
  product!: Product
  error: any

  constructor (private productService: ProductService, private apollo: Apollo) {}

  searchProducts(searchingFor: string) {
    this.searchControlFlag = true
    if (searchingFor != this.searchControl) {
      this.searchControl = searchingFor
      this.apollo.watchQuery({
        query: GET_PRODUCTS
      }).valueChanges.subscribe(({ data, error }: any) => {
        console.log(data)
        this.products = data.findAllProducts
        this.error = error
      })
    }
  }

  searchProductById (searchingFor: string) {
    if (searchingFor != this.searchControl) {
      this.searchControl = searchingFor
      let toNumber = Number(searchingFor)
      this.apollo.watchQuery({
        query: GET_PRODUCTS_BY_ID,
        variables: {
          id: toNumber
        }
      }).valueChanges.subscribe(({ data, error }: any) => {
        console.log(data)
        this.product = data.findByProductId
        this.error = error
      })
    }
  }

  close () {
    this.searchControlFlag = false
  }
}
