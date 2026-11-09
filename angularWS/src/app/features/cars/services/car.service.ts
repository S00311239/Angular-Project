import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Car, CreateCarDto } from '../models/car.model';

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
    })  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`, {
      headers: {
        'x-api-key': 'blahblah'
        }
      })  }

  addCar(car: CreateCarDto): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car,{
      
      headers: {
      'x-api-key': 'blahblah'
      }
    })
  }

}