import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root',
})

export class CarService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/v1/cars';

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl, {
      headers: {
        'x-api-key': 'blahblah'
      }
    });
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`, {
      headers: {
        'x-api-key': 'blahblah'
      }
    });
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car,{
      
      headers: {
      'x-api-key': 'blahblah'
    }
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status === 401 || error.status === 403) {
        console.error('authorisation issue', error.status);
        return throwError(() => new Error('You are not authorised for that action'));
      }

      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}