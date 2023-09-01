import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from './product.model';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { SEARCH_PRODUCTS_BY_LOCATION } from 'src/app/graphql.queries';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:8080/auth/authenticate"

  products: Product[] = []
  error: any

  constructor(private snackBar: MatSnackBar, private http: HttpClient, private apollo: Apollo) { }

  create (product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product)
  }

  read (): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }

  searchProductByLocation (searchingFor: string, longitude: number, latitude: number) {
    if (searchingFor != "") {
      this.apollo.watchQuery({
        query: SEARCH_PRODUCTS_BY_LOCATION,
        variables: {
          searchingFor: searchingFor,
          lng: longitude,
          lat: latitude
        }
      }).valueChanges.subscribe(({ data, error }: any) => {
        console.log(data)
        this.products = data.searchingForWithLngLat
        this.error = error
      })
    }
  }

  showMessage (msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }
}
