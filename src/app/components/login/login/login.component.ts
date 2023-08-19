import { Component, OnInit } from '@angular/core';
import { Login } from '../login.model';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jwtToken!: any
  authLogin: Login = {
    username: "",
    password: ""
  }

  baseUrl = "http://localhost:8080/auth/authenticate"

  constructor (private snackBar: MatSnackBar, private http: HttpClient, private router: Router) {}

 ngOnInit(): void {

 }

 authenticate () {
  if (this.authLogin.username != "" && this.authLogin.password != "") {
    return this.http.post<string>(this.baseUrl, this.authLogin)
      .subscribe((response) => {
        this.jwtToken = response
        localStorage.setItem("user_token", this.jwtToken.token)
        this.router.navigate([''])
        },
        (err) => { this.popupAlert("Usuário não encontrado") })
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

}
