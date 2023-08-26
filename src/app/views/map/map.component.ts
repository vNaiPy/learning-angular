import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'alpha-front';
  latitude = 0;
  longitude = 0;
  map!: mapboxgl.Map

  ngOnInit() {
    this.takeUserLocation()
    this.mapInitializer();
  }

  takeUserLocation () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((userPosition) => {
        this.latitude = userPosition.coords.latitude
        this.longitude = userPosition.coords.longitude
        console.log(this.latitude)
        console.log(this.longitude)
      })
    }
    else alert("Sem permissão!")
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
      },)
    this.map.addControl(new mapboxgl.NavigationControl())
    this.map.addControl(new mapboxgl.GeolocateControl())
    this.map.addControl(mapBoxGeocoder, "top-left");

    let marker1 = new mapboxgl.Marker()

    this.map.on('click', (e) => {
        this.longitude = e.lngLat.lng
        this.latitude = e.lngLat.lat
        console.log(this.longitude)
        console.log(this.latitude)
        marker1.setLngLat([this.longitude, this.latitude])
        .addTo(this.map)
    })
  }

}
