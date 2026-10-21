import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}