import {Component, ComponentRef, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, switchMap, tap} from "rxjs";
import {CovidServicesService} from "../../../shared/services/covid-services.service";
import { tileLayer, latLng, marker, Marker } from 'leaflet';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss']
})
export class CovidComponent implements OnInit {
  listGlobalCovid: Observable<any> | undefined;
  listCovidbyCountry: Observable<any> | undefined;
  listLastestByCountry: Observable<any> | undefined;
  private isoUpdater = new BehaviorSubject('VN');
  // map
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  //chart
  single: any[] | undefined;
  public view: any = [300, 300];
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public graphDataChart: any[] | undefined;
  public colorScheme: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private covidService: CovidServicesService) { }

  ngOnInit(): void {
    this.listGlobalCovid = this.covidService.listGlobalCovid();
    this.listLastestByCountry = combineLatest([this.isoUpdater]).pipe(
      switchMap(([iso]) => this.covidService.listCovidbyCountryLastest(iso || 'VN'))
    );

    // @ts-ignore
    this.listCovidbyCountry = this.covidService.listCovidbyCountry('VN').pipe(map(res => res[0].timeseries),
      tap(key => {
        const k = [Object.keys(key)];
        for(let j = key.length -1; j >=0; j--){

        }
        console.log(key)
        console.log(k)
      }))

  }

}
