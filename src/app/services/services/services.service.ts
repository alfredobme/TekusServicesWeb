import { Injectable, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap , catchError, of } from 'rxjs';
import { Service } from '../../models/service.model';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users/users.service';
import { CustomMessageComponent } from '../../components/custom-message/custom-message/custom-message.component';
import { API_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl: string;
  
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private usersService: UsersService,
    @Inject(API_URL) apiUrl: string
  ) {
    this.baseUrl = `${apiUrl}/Services`;
  }

  getServices(): Observable<Service[]> {
    return this.usersService.getToken().pipe(
      switchMap(token => {
        if (!token) {
          this.showError('Authorization failed. Please try again')
          return of([]);
        }

        return this.http.get<Service[]>(this.baseUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }),
      catchError(() => {
        this.showError('Check internet connection. And try again')
        return of([]);
      })
    );
  }

  saveService(data: any): Observable<any> {
    return this.usersService.getToken().pipe(
      switchMap(token => {
        if (!token) {
          this.showError('Authorization failed. Please try again')
          return of([]);
        }

        return this.http.post(this.baseUrl, data, {
          headers: { Authorization: `Bearer ${token}` }
        }).pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        );
      })
    );
  }

  deleteService(serviceId: number): Observable<any> {
    return this.usersService.getToken().pipe(
      switchMap(token => {
        if (!token) {
          this.showError('Authorization failed. Please try again')
          return of([]);
        }

        return this.http.delete(`${this.baseUrl}/${serviceId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }).pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        );
      })
    );
  }

  modifyService(serviceId: number, data: any): Observable<any> {
    return this.usersService.getToken().pipe(
      switchMap(token => {
        if (!token) {
          this.showError('Authorization failed. Please try again')
          return of([]);
        }

        return this.http.put(`${this.baseUrl}/${serviceId}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        }).pipe(
          catchError((error) => {
            console.log(error)
            return throwError(() => error);
          })
        );
      })
    );
  }

  showError(message: string) {
    this.snackBar.openFromComponent(CustomMessageComponent, {
      data: { text: message, type: 'errorWithButton' },
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['custom-error-toast']
    });
  }
}
