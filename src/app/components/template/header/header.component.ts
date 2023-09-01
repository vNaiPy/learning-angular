import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { ProductService } from './../../product/product.service';
import { Component, OnInit } from '@angular/core';
import { GET_PRODUCTS, GET_PRODUCTS_BY_ID, SEARCH_PRODUCTS_BY_LOCATION } from 'src/app/graphql.queries';
import { Product } from '../../product/product.model';
import { Cadastro, Login } from '../../login/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchFor: string = ""
  searchControl = this.searchFor
  searchControlFlag = false

  products: Product[] = []
  product!: Product
  error: any

  jwtToken!: any
  authLogin: Login = {
    username: "",
    password: ""
  }
  logged = false;

  authCadastro: Cadastro = {
    name: "",
    email: "",
    phone: "",
    password: ""
  }

  baseUrl = "http://localhost:8080/auth"

  constructor (private snackBar: MatSnackBar, private http: HttpClient, private apollo: Apollo, private router: Router) {}
  ngOnInit(): void {
    this.isLogged()
  }

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

  authenticate () {
    if (this.authLogin.username != "" && this.authLogin.password != "") {
      return this.http.post<string>(this.baseUrl+"/authenticate", this.authLogin)
        .subscribe((response) => {
          this.jwtToken = response
          localStorage.setItem("user_token", this.jwtToken.token)
          this.logged = true
          window.location.reload()
          },
          (err) => { this.popupAlert("Usuário não encontrado") })
    }
    else {
      this.popupAlert("Email/Senha não informado!")
      return
    }
  }

  cadastro () {
    if (this.authCadastro.name != "" && this.authCadastro.password != "" && this.authCadastro.email != "" && (this.authCadastro.phone != "" && this.authCadastro.phone.length == 11)) {
      return this.http.post<void>(this.baseUrl+"/register", this.authCadastro)
        .subscribe((response) => {
          this.popupAlert("Usuário cadastrado!")
          window.location.reload()
          },
          (err) => { this.popupAlert("Usuário não foi cadastrado!") })
    }
    else {
      this.popupAlert("Email/Senha não informado!")
      return
    }
  }

   popupAlert (msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
   }

   isLogged () {
    if(localStorage.getItem('user_token') != null) this.logged = true
   }
}
