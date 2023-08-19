import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Input() showSideProductsList!: boolean
  @Output() turnOff: EventEmitter<boolean> = new EventEmitter()
  products: any[] = []
  error: any

  constructor (private productService: ProductService, private apollo: Apollo) {}

  ngOnInit(): void {

  }

  close() {
    this.turnOff.emit();
  }
}
