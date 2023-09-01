import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { STORE_REGISTRATION } from 'src/app/graphql.queries';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor (private productService: ProductService, private apollo: Apollo, private router: Router) {}

  product: Product = {
    name: "",
    description: "",
    price: 0
  }

  ngOnInit(): void {
  }

  registerStore () {
      this.apollo.mutate({
        mutation: STORE_REGISTRATION,
        variables: {
          name: "carlinhosdupneu",
          logoUrl: "carlinhosdupneu",
          bannerUrl: "banner-url",
          street: "rua gasparini",
          complement: "bruxa do 91",
          neighborhood: "Ramos",
          city: "SBC",
          state: "SP",
          country: "Brazil",
          longitude: -46.57452241491228,
          latitude: -23.651042029689094
        }
      }).subscribe(({ data, error }: any) => {
        console.log(data)
      })
  }

  cancel () {
    this.router.navigate(['/products'])
  }

}
