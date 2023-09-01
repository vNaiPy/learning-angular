import { Localization } from './../login/login.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Store } from '../login/login.model';
import { STORE_REGISTRATION } from 'src/app/graphql.queries';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'app-store-registration',
  templateUrl: './store-registration.component.html',
  styleUrls: ['./store-registration.component.css']
})
export class StoreRegistrationComponent implements OnInit {

  constructor ( private apollo: Apollo, private router: Router) {}

  ngOnInit(): void {

  }

  store: Store = {
    name: "Casa dos doces",
    logoUrl: "C:/Users/NaiPy/Desktop/Lojas/46118[Convertido].png",
    bannerUrl: "C:/Users/NaiPy/Desktop/Lojas/46118[Convertido].png",
    address: {
      street: "Rua Gasparini, 130",
      complement: "Apartamento 92",
      neighborhood: "Rudge Ramos",
      city: "São Bernardo do Campo",
      state: "São Paulo",
      country: "Brasil",
      longitude: -46.57455097313385,
      latitude: -46.57455097313385
    }
  }

  receberCoords(coords: string) {
    let co = coords.split(",")
    this.store.address.longitude = Number(co.at(0))
    this.store.address.latitude = Number(co.at(1))

    console.log("longitude: " + this.store.address.longitude)
    console.log("latitude: " + this.store.address.latitude)
  }


  registerStore () {
    this.apollo.mutate({
      mutation: STORE_REGISTRATION,
      variables: {
        name: this.store.name,
        logoUrl: this.store.logoUrl,
        bannerUrl: this.store.bannerUrl,
        street: this.store.address.street,
        complement: this.store.address.complement,
        neighborhood: this.store.address.neighborhood,
        city: this.store.address.city,
        state: this.store.address.state,
        country: this.store.address.country,
        longitude: this.store.address.longitude,
        latitude: this.store.address.latitude
      }
    }).subscribe(({ data, error }: any) => {
      console.log(data)
    })
}

}
