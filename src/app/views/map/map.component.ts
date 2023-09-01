import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Output() coords = new EventEmitter();

  title = 'alpha-front';
  latitude = 0;
  longitude = 0;
  map!: mapboxgl.Map

  products: any = [
    {
      "name": "Harry Potter",
      "description": "Lorem ipsum dolor sit amet, consectetur.",
      "price": 90.5,
      "imgUrl": "img-url",
      "status": "ACTIVE",
      "store": {
          "name": "Casa dos doces",
          "address": {
              "longitude": -46.57612811203876,
              "latitude": -23.648545152733604
          }
      },
      "categories": [
          {
              "id": "3",
              "name": "Books"
          }
      ]
    },
    {
      "name": "Harry Potter T-shirt",
      "description": "Lorem ipsum dolor sit amet, consectetur.",
      "price": 90.5,
      "imgUrl": "img-url",
      "status": "ACTIVE",
      "store": {
          "name": "Casa dos doces",
          "address": {
              "longitude": -46.569041715820106,
              "latitude": -23.650127429059978
          }
      },
      "categories": [
          {
              "id": "3",
              "name": "Books"
          }
      ]
    },
    {
      "name": "Harry Potter Movie",
      "description": "Lorem ipsum dolor sit amet, consectetur.",
      "price": 90.5,
      "imgUrl": "img-url",
      "status": "ACTIVE",
      "store": {
          "name": "Casa dos doces",
          "address": {
              "longitude": -46.57929968362967,
              "latitude": -23.65540294998945
          }
      },
      "categories": [
          {
              "id": "3",
              "name": "Books"
          }
      ]
    },
  ]

  ngOnInit() {
    this.mapInitializer();
  }

  mapInitializer () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuZHJlaW1vcmFpcyIsImEiOiJjbGxoZnZ4dzQwYXhkM2xsdzZ2aW9uc2tyIn0.0u2hw87FzG6EmZ5Dz3z0PA';
    this.map = new mapboxgl.Map({
      container: 'map-box',
      style:  'mapbox://styles/handreimorais/cllhg626n020f01mf64t075eb'
    });

    let mapBoxGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false
      },)

    let mapBoxGeoControl = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      showUserLocation: true,
      trackUserLocation: true
      })

    this.map.addControl(new mapboxgl.NavigationControl(), "bottom-right")
    this.map.addControl(mapBoxGeoControl, "bottom-right")
    this.map.addControl(mapBoxGeocoder, "top-left");

    let marker1 = new mapboxgl.Marker()
    let marker2 = new mapboxgl.Marker()
    let marker3 = new mapboxgl.Marker()
    let marker4 = new mapboxgl.Marker()

    this.map.on('click', (e) => {
        this.longitude = e.lngLat.lng
        this.latitude = e.lngLat.lat
        this.coords.emit(this.longitude+","+this.latitude)
        console.log(this.longitude)
        console.log(this.latitude)
        marker2.setLngLat([-46.57612811203876, -23.648545152733604])
        .addTo(this.map)
        marker3.setLngLat([-46.569041715820106, -23.650127429059978])
        .addTo(this.map)

    })
  }

}
