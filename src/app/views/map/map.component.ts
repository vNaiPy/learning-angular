import { Component, OnInit } from '@angular/core';
import VectorSource from 'ol/source/Vector.js';
import Point from 'ol/geom/Point.js';
import Feature from 'ol/Feature.js';
import Map from 'ol/Map';
import View from 'ol/View';
import {Vector as VectorLayer} from 'ol/layer.js';
import {Icon, Style} from 'ol/style.js';
import TileLayer from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM';

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

  ngOnInit() {
    this.verifica_local();
  }

  verifica_local() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
      this.latitude = pos.coords.latitude
      this.longitude = pos.coords.longitude
      this.mapInit(this.longitude, this.latitude)},
      () => { alert("Sem localização!") },
      { timeout: 15000 });
    }
    else alert("Sem permissão!")
  }

  mapInit (longitude: number, latitude: number) {
    const myPoint = new Feature({geometry: new Point(fromLonLat([longitude, latitude])),})
    const vectorSource = new VectorSource({features: [myPoint],})
    const vectorLayer = new VectorLayer({source: vectorSource,})

    this.map = new Map({
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 16,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer
      ],
      target: 'ol-map'
    })
  }
  
}
