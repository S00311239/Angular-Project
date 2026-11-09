import { Component, inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { CarCard } from '../../components/car-card/car-card';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-car-list',
  imports: [ CarCard],
  templateUrl: './car-list.html',
  styleUrl: './car-list.scss',
})
export class CarList {
 
  private carService = inject(CarService);

  cars = toSignal(this.carService.getCars());

  // we removed the observable below
  // cars$!: Observable<Car[]>;

  // ngOnInit(): void {
  //   this.cars$ = this.carService.getCars();
  // }
}