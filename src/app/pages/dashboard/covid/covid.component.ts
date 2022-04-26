import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, switchMap, tap} from "rxjs";
import {CovidServicesService} from "../../../shared/services/covid-services.service";
import {latLng, LayerGroup, tileLayer} from 'leaflet';
import * as L from 'leaflet';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
  listGlobalCovid: Observable<any> | undefined;
  listCovidbyCountry: Observable<any> | undefined;
  listLastestByCountry: Observable<any> | undefined;
  listCountry: Observable<any> | undefined;
  private isoUpdater = new BehaviorSubject(null);
  countryISO: any;
  // map
  map: L.Map | any;
  markers: L.Layer[] = [];
  iconUrl = "https://decisionfarm.ca/assets/images/marker-icon-2x.png";
  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '...'})
    ],
    zoom: 5,
    center: latLng(21.030653, 105.847130)
  };

  //chart
  single: any[] | undefined;
  public view: any = [500, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public graphDataChart: any[] | undefined;
  xAxisLabel: any = ['Year'];
  public colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private covidService: CovidServicesService) {
    this.countryISO = "VN";
  }

  ngOnInit(): void {
    this.listGlobalCovid = this.covidService.listGlobalCovid();
    this.listCountry = this.covidService.listIsoCountry().pipe(
      map(country => (country as any).data)
    )

    this.listLastestByCountry = combineLatest([this.isoUpdater]).pipe(
      switchMap(([iso]) => this.covidService.listCovidbyCountryLastest(iso || 'VN')),
      tap(res => {
        this.map.panTo(new L.LatLng((res as any)[0]?.location.lat, (res as any)[0]?.location.lng));
        const newMarker = L.marker([(res as any)[0]?.location.lat, (res as any)[0]?.location.lng], this.markerIcon);
        this.markers.push(newMarker);
        newMarker.addTo(this.map);
      })
    );

    this.listCovidbyCountry = combineLatest([this.isoUpdater]).pipe(
      switchMap(([iso]) => this.covidService.listCovidbyCountry(iso || 'VN')),
      map(res => (res as any)[0].timeseries),
      map(key => {
        const k = Object.keys(key);
        let list = [];
        for (let j = k.length - 1; j >= k.length - 15; j--) {
          let data = key[k[j]]
          data.name = k[j];
          list.push(data);
        }

        //map data confirmed to array
        const confirmed = list.map(confirmed => {
          return {
            name: confirmed.name,
            value: confirmed.confirmed
          }
        })

        //map data recovered to array
        const recovered = list.map(recovered => {
          return {
            name: recovered.name,
            value: recovered.recovered + Math.random() * 10000000
          }
        })

        //map data deaths to array
        const deaths = list.map(deaths => {
          return {
            name: deaths.name,
            value: deaths.deaths * 100
          }
        })

        const chartData = [];
        chartData.push({name: 'confirmed', series: confirmed});
        chartData.push({name: 'recovered', series: recovered});
        chartData.push({name: 'deaths', series: deaths});
console.log(chartData)
        return chartData;
      }))

  }

  changeCountry() {
    this.isoUpdater.next(this.countryISO);
  }

  onMapReady(map: L.Map) {
    this.map = map;
  }

}
