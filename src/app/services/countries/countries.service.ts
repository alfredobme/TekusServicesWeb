import { Injectable, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { API_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private baseUrl: string;
  
  constructor(
    private http: HttpClient,
    @Inject(API_URL) apiUrl: string
  ) {
    this.baseUrl = `${apiUrl}/Countries`;
  }

  getCountries(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
