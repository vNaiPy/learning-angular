import { Component, OnInit } from '@angular/core';
import VectorSource from 'ol/source/Vector.js';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map';
import View from 'ol/View';
import {Group, Vector as VectorLayer} from 'ol/layer.js';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'alpha-front';
  map!: Map
  map_url = "";
  latitude = 0;
  longitude = 0;
  mapt!: mapboxgl.Map

  ngOnInit() {
    //this.verifica_local();
    this.mapInitializer();

  }

  mapInitializer () {
  if (navigator.geolocation) {
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuZHJlaW1vcmFpcyIsImEiOiJjbGxoZnZ4dzQwYXhkM2xsdzZ2aW9uc2tyIn0.0u2hw87FzG6EmZ5Dz3z0PA';
    this.mapt = new mapboxgl.Map({
      container: 'map-box',
      style:  'mapbox://styles/handreimorais/cllhg626n020f01mf64t075eb'
    });
    this.mapt.addControl(new mapboxgl.NavigationControl())
    this.mapt.addControl(new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
    }),
    "top-left")
    this.mapt.addControl(new mapboxgl.GeolocateControl())
  }
  else alert("É necessário habilitar sua localização para usar os recursos deste app!")
  }

  verifica_local() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
      this.latitude = -23.6509822
      this.longitude = -46.5746165
      console.log(this.latitude)
      console.log(this.longitude)
      this.mapInit(this.longitude, this.latitude)},
      () => { alert("Sem localização!") },
      { timeout: 15000 });
    }
    else alert("Sem permissão!")
  }

  mapInit (longitude: number, latitude: number) {
    const myPoint = new Feature({geometry: new Point(fromLonLat([longitude, latitude])),})
    const vectorSource = new VectorSource({features: [myPoint],})
    const vectorLayer = new VectorLayer(
      {source: vectorSource,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33',
      }}
      )

    let mapView =  new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 16,
      })

    this.map = new Map({
      target: 'ol-map'
    })
    this.map.setView(mapView)

    const openStreetMapStandard = new TileLayer ({
      source: new OSM(),
      visible: true
    })

    let layerGroup = new Group({
      layers: [
        openStreetMapStandard, vectorLayer
      ]
    })

    this.map.addLayer(layerGroup)

    this.map.on('click', function(ev) {
      console.log(ev.coordinate)
    })
  }

}
