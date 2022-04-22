import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {BehaviorSubject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private http: HttpClient) {
  }

  get(url: string, params?: HttpParams) {
    return this.http.get(`${environment.apiUrl}/${url}`, {params: params}).pipe(catchError(this.errorHandler.bind(this)));
  }

  post(url: string, body: any) {
    return this.http.post(`${environment.apiUrl}/${url}`, body).pipe(catchError(this.errorHandler.bind(this)));
  }

  delete(url: string) {
    return this.http.delete(`${environment.apiUrl}/${url}`).pipe(catchError(this.errorHandler.bind(this)));
  }

  errorHandler(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    return throwError(
      error);
  }
}
