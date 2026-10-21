import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Car } from '../../models/car.model';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})
export class CarForm {


  private formBuilder = inject(FormBuilder);

  carForm = this.formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['']
  });
  private carService = inject(CarService);
  private router = inject(Router);

  onSubmit(): void {
    const carData: Car = this.carForm.value as Car;
    console.log('Submitted Car:', carData);

    this.carService.addCar(carData).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (error) => {
        console.error('Error adding car:', error);
      }
    });
  }
  
}
