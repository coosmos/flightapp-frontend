import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flight',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-flight.html',
  styleUrls: ['./add-flight.css']
})
export class AddFlight {

  flight = {
    flightNumber: '',
    airline: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: null,
    totalSeats: null
  };

  loading = false;
  error = '';
  success = '';
  
  validationErrors = {
    flightNumber: '',
    airline: '',
    source: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    totalSeats: ''
  };

  minDateTime: string = '';

  constructor(private http: HttpClient,private  router:Router) {
    this.setMinDateTime();
  }

  setMinDateTime() {
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  validateFlightNumber(): boolean {
    const flightNumberRegex = /^[A-Z]{2}-\d{3,4}$/
    if (!this.flight.flightNumber.trim()) {
      this.validationErrors.flightNumber = 'Flight number is required';
      return false;
    }
    if (!flightNumberRegex.test(this.flight.flightNumber)) {
      this.validationErrors.flightNumber = 'Format: 2 uppercase letters + hyphen + 3-4 digits (e.g., AI-367)';
      return false;
    }
    this.validationErrors.flightNumber = '';
    return true;
  }

  validateAirline(): boolean {
    if (!this.flight.airline.trim()) {
      this.validationErrors.airline = 'Airline name is required';
      return false;
    }
    this.validationErrors.airline = '';
    return true;
  }

  validateSource(): boolean {
    const airportCodeRegex = /^[A-Z]{3}$/;
    if (!this.flight.source.trim()) {
      this.validationErrors.source = 'Source airport code is required';
      return false;
    }
    if (!airportCodeRegex.test(this.flight.source)) {
      this.validationErrors.source = 'Must be 3 uppercase letters (e.g., DEL)';
      return false;
    }    
    this.validationErrors.source = '';
    return true;
  }

  validateDestination(): boolean {
    const airportCodeRegex = /^[A-Z]{3}$/;
    if (!this.flight.destination.trim()) {
      this.validationErrors.destination = 'Destination airport code is required';
      return false;
    }
    if (!airportCodeRegex.test(this.flight.destination)) {
      this.validationErrors.destination = 'Must be 3 uppercase letters (e.g., MUM)';
      return false;
    }
    if (this.flight.source && this.flight.destination === this.flight.source) {
      this.validationErrors.destination = 'Destination must be different from source';
      return false;
    }
    this.validationErrors.destination = '';
    return true;
  }

  validateDepartureTime(): boolean {
    if (!this.flight.departureTime) {
      this.validationErrors.departureTime = 'Departure time is required';
      return false;
    }
    const departureDate = new Date(this.flight.departureTime);
    const now = new Date();
    if (departureDate < now) {
      this.validationErrors.departureTime = 'Departure time cannot be in the past';
      return false;
    }
    this.validationErrors.departureTime = '';
    return true;
  }

  validateArrivalTime(): boolean {
    if (!this.flight.arrivalTime) {
      this.validationErrors.arrivalTime = 'Arrival time is required';
      return false;
    }
    const arrivalDate = new Date(this.flight.arrivalTime);
    const now = new Date();
    if (arrivalDate < now) {
      this.validationErrors.arrivalTime = 'Arrival time cannot be in the past';
      return false;
    }
    if (this.flight.departureTime) {
      const departureDate = new Date(this.flight.departureTime);
      if (arrivalDate <= departureDate) {
        this.validationErrors.arrivalTime = 'Arrival time must be after departure time';
        return false;
      }
    }
    this.validationErrors.arrivalTime = '';
    return true;
  }

  validatePrice(): boolean {
    if (this.flight.price === null || this.flight.price === undefined) {
      this.validationErrors.price = 'Price is required';
      return false;
    }

    if (this.flight.price <= 0) {
      this.validationErrors.price = 'Price must be greater than 0';
      return false;
    }

    this.validationErrors.price = '';
    return true;
  }

  validateTotalSeats(): boolean {
    if (this.flight.totalSeats === null || this.flight.totalSeats === undefined) {
      this.validationErrors.totalSeats = 'Total seats is required';
      return false;
    }
    if (this.flight.totalSeats <= 0) {
      this.validationErrors.totalSeats = 'Total seats must be greater than 0';
      return false;
    }
    if (!Number.isInteger(this.flight.totalSeats)) {
      this.validationErrors.totalSeats = 'Total seats must be a whole number';
      return false;
    }
    this.validationErrors.totalSeats = '';
    return true;
  }

  validateAll(): boolean {
    const validations = [
      this.validateFlightNumber(),
      this.validateAirline(),
      this.validateSource(),
      this.validateDestination(),
      this.validateDepartureTime(),
      this.validateArrivalTime(),
      this.validatePrice(),
      this.validateTotalSeats()
    ];

    return validations.every(v => v === true);
  }

  addFlight() {
    this.error = '';
    this.success = '';
    if (!this.validateAll()) {
      this.error = 'Please fix all validation errors';
      return;
    }
    this.loading = true;
    this.http.post('http://localhost:9090/api/flight', this.flight)
      .subscribe({
        next: () => {
          this.success = 'Flight added successfully';
          this.loading = false;
          this.clearForm();
        },
        error: (err) => {
          this.error = err.status === 403
            ? 'Admin access required'
            : 'Failed to add flight';
          this.loading = false;
        }
      });
  }

  clearForm() {
    this.flight = {
      flightNumber: '',
      airline: '',
      source: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      price: null,
      totalSeats: null
    };
    this.validationErrors = {
      flightNumber: '',
      airline: '',
      source: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      totalSeats: ''
    };
  }

  cancel() {
    this.clearForm();
    this.error = '';
    this.success = '';
    this.router.navigate(['/']);
  }
}