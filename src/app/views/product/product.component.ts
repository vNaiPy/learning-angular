import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_STORE_BY_CURRENT_USER_ID } from 'src/app/graphql.queries';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  storeByCurrentUser!: any
  error!: any

  constructor (private router: Router, private apollo: Apollo) {}

  ngOnInit (): void {
    this.apollo.watchQuery({
      query: GET_STORE_BY_CURRENT_USER_ID,
    }).valueChanges.subscribe(({ data, error }: any) => {
      console.log(data)
      this.storeByCurrentUser = data.findAllProducts
      this.error = error
    })
    console.log(this.storeByCurrentUser)
  }

  navigateToProductCreate (): void {
    this.router.navigate(['/products/create'])
  }
}
