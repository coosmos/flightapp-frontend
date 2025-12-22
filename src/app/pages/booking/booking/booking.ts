import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { FlightStoreService } from '../../../services/flight-store.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookingStoreService } from '../../../services/booking-store.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../../services/user.store.service';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class BookingComponent {

  selectedFlight: any;

  bookingObject = {
    "contactEmail": '',
    "contactPhone": '',
    passengers: [this.createPassenger()]
  }

  // Validation states
  emailError: string = '';
  phoneError: string = '';
  passengerErrors: { firstName: string, lastName: string, age: string }[] = [];

  constructor(
    private store: FlightStoreService,
    private bookingService: BookingService,
    private bookingStore: BookingStoreService,
    private router: Router,
    private userStore: UserStoreService
  ) { }

  bookingResponse: any;

  ngOnInit() {
    this.selectedFlight = this.store.getSelectedFlight();
    console.log('selected flight', this.selectedFlight);
    this.initializePassengerErrors();
  }

  createPassenger() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      gender: 'male'
    }
  }

  initializePassengerErrors() {
    this.passengerErrors = this.bookingObject.passengers.map(() => ({
      firstName: '',
      lastName: '',
      age: ''
    }));
  }

  addPassenger() {
    if (this.bookingObject.passengers.length < 6) {
      this.bookingObject.passengers.push(this.createPassenger());
      this.passengerErrors.push({ firstName: '', lastName: '', age: '' });
    }
  }

  removePassenger(index: number) {
    if (this.bookingObject.passengers.length > 1) {
      this.bookingObject.passengers.splice(index, 1);
      this.passengerErrors.splice(index, 1);
    }
  }

  validateEmail(): boolean {
    const email = this.bookingObject.contactEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      this.emailError = 'Email is required';
      return false;
    }
    
    if (!emailRegex.test(email)) {
      this.emailError = 'Please enter a valid email address';
      return false;
    }
    
    this.emailError = '';
    return true;
  }

  validatePhone(): boolean {
    const phone = this.bookingObject.contactPhone.trim();
    const phoneRegex = /^\d{10}$/;
    
    if (!phone) {
      this.phoneError = 'Phone number is required';
      return false;
    }
    
    if (!phoneRegex.test(phone)) {
      this.phoneError = 'Please enter a valid 10-digit phone number';
      return false;
    }
    
    this.phoneError = '';
    return true;
  }

  validatePassenger(index: number): boolean {
    const passenger = this.bookingObject.passengers[index];
    let isValid = true;
    if (!passenger.firstName.trim()) {
      this.passengerErrors[index].firstName = 'First name is required';
      isValid = false;
    } else {
      this.passengerErrors[index].firstName = '';
    }
    if (!passenger.lastName.trim()) {
      this.passengerErrors[index].lastName = 'Last name is required';
      isValid = false;
    } else {
      this.passengerErrors[index].lastName = '';
    }
    const age = parseInt(passenger.age);
    if (!passenger.age || isNaN(age)) {
      this.passengerErrors[index].age = 'Age is required';
      isValid = false;
    } else if (age < 1 || age > 120) {
      this.passengerErrors[index].age = 'Please enter a valid age (1-120)';
      isValid = false;
    } else {
      this.passengerErrors[index].age = '';
    }

    return isValid;
  }

  validateAllPassengers(): boolean {
    let allValid = true;
    for (let i = 0; i < this.bookingObject.passengers.length; i++) {
      if (!this.validatePassenger(i)) {
        allValid = false;
      }
    }
    return allValid;
  }

  confirmBooking() {
    const ownerEmail = this.userStore.getEmail();
    if (!ownerEmail) {
      console.error('User not logged in');
      alert('Please log in to continue');
      return;
    }
    const isEmailValid = this.validateEmail();
    const isPhoneValid = this.validatePhone();
    const arePassengersValid = this.validateAllPassengers();

    if (!isEmailValid || !isPhoneValid || !arePassengersValid) {
      alert('Please fix all validation errors before confirming booking');
      return;
    }

    const payload = {
      flightNumber: this.selectedFlight.flightNumber,
      ticketPrice: this.selectedFlight.price,
      airline: this.selectedFlight.airline,
      source: this.selectedFlight.source,
      destination: this.selectedFlight.destination,
      departureTime: this.selectedFlight.departureTime,
      arrivalTime: this.selectedFlight.arrivalTime,
      passengers: this.bookingObject.passengers,
      contactEmail: this.bookingObject.contactEmail,
      contactPhone: this.bookingObject.contactPhone,
      bookingOwnerEmail: ownerEmail
    };

    console.log('booking payload', payload);
    
    this.bookingService.createBooking(payload).subscribe({
      next: (response) => {
        const bookingForUI = {
          ...response,
          departureTime: this.selectedFlight.departureTime,
          arrivalTime: this.selectedFlight.arrivalTime,
          source: this.selectedFlight.source,
          destination: this.selectedFlight.destination
        };

        this.bookingStore.setBooking(bookingForUI);
        this.router.navigate(['/booking-state']);
      },
      error: (err) => {
        console.log('booking error', err);
        alert('Booking failed. Please try again.');
      }
    });
  }
}