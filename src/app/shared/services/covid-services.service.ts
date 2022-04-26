import { Injectable } from '@angular/core';
import {BaseApiService} from "../baseApi/base-api.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CovidServicesService {

  constructor(private http: BaseApiService, private HttpService: HttpClient) {}

  listGlobalCovid() {
    return this.http.get('brief').pipe(catchError(async err => {
      if (err.status === 0) {
        console.log(`Mất kết nối mạng`);
      } else {
        console.log((err as any).error);
      }
    }));
    ;
  }
  listCovidbyCountry(iso: any) {
    const url = `https://master-covid-19-api-laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=${iso}&onlyCountries=true`
    return this.HttpService.get(url).pipe(catchError(async err => {
      if (err.status === 0) {
        console.log(`Mất kết nối mạng`);
      } else {
        console.log((err as any).error);
      }
    }));
  }

  listCovidbyCountryLastest(iso: any) {
    return this.http.get('latest', new HttpParams().set('iso2', iso).set('onlyCountries', true)).pipe(catchError(async err => {
      if (err.status === 0) {
        console.log(`Mất kết nối mạng`);
      } else {
        console.log((err as any).error);
      }
    }));
  }

  listIsoCountry(){
    const url = `https://countriesnow.space/api/v0.1/countries/iso`
    return this.HttpService.get(url).pipe(catchError(async err => {
      if (err.status === 0) {
        console.log(`Mất kết nối mạng`);
      } else {
        console.log((err as any).error);
      }
    }));
  }
}
