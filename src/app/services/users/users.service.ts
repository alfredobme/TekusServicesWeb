import { Injectable, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { API_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string;
  
  constructor(
    private http: HttpClient,
    @Inject(API_URL) apiUrl: string
  ) {
    this.baseUrl = `${apiUrl}/Users/Login`;
  }

  getToken(): Observable<string | null> {
    const credentials = btoa('pruebas:pruebas');

    return this.http.post<any>(this.baseUrl, {}, {
      headers: { Authorization: `Basic ${credentials}` }
    }).pipe(
      map(res => res?.token ?? null),
      catchError(() => of(null))
    );
  }
}
