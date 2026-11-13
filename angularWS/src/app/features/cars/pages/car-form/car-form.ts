import { Component, inject, signal, input, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateCarDto } from '../../models/car.model';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import { MatButtonModule, } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../../../../shared/validators/not-blank.validator';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule, 
            RouterLink,
            MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            MatCardModule,
            MatProgressBarModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.scss',
})

export class CarForm implements OnInit{

  private formBuilder = inject(FormBuilder);
  saving = signal(false);
  saveError = signal<string | null>(null);
  readonly currentYear = new Date().getFullYear();
  private snackBar = inject(MatSnackBar);

  carForm = this.formBuilder.nonNullable.group({
    make: ['', [
            Validators.required, 
            Validators.minLength(2), 
            Validators.maxLength  (30),
            notBlank
          ]],
            
    model: ['', [
            Validators.required, 
            Validators.maxLength(30),
            notBlank
        ]],
    year: this.formBuilder.control<number | null>(null, [
            Validators.min(1950),
            Validators.max(this.currentYear + 1),]),
  });
  
  private carService = inject(CarService);
  private router = inject(Router);

  //declaring input signal
  readonly id = input<string>(); // note this is optional by default'
  
  ngOnInit(): void {

    const id = this.id();

    if (!id) return; // adding a new car, nothing to load

    this.carService.getCarById(id).subscribe({

      next: (car) => this.carForm.patchValue({ 
        make: car.make,
        model: car.model, 
        year: car.year ?? null 
      }),

      error: (err: Error) => this.saveError.set(err.message),

    });
  }

  onSubmit(): void {

    if (this.carForm.invalid) return;

    const { make, model, year } = this.carForm.getRawValue();
    const newCar: CreateCarDto = { make, model, year: year ?? undefined };

    const id = this.id();
    const request = id ? this.carService.updateCar(id, newCar) : this.carService.addCar(newCar);
    
    this.saving.set(true);
    this.saveError.set(null);


    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newCar.make} ${newCar.model} saved`, 'Close', { duration: 10000 });
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
      },
    });
  }
}
