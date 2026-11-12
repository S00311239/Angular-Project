import { Component, inject, input } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink],
  templateUrl: './car-details.html',
  styleUrl: './car-details.scss',
})

export class CarDetails{

  private carService = inject(CarService);

  private readonly router = inject(Router);

  readonly id = input.required<string>();

  readonly initial: LoadState<Car> = { status: 'loading'};

  state = toSignal(
    toObservable(this.id).pipe(
    switchMap((id) => withLoadState(this.carService.getCarById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteCar(car: Car): void {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;

    this.carService.deleteCar(car._id).subscribe({
      next: () => this.router.navigate(['/cars']),
    });
  }
}