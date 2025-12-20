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

  }

  createPassenger() {
    return {
      firstName: '',
      lastName: '',
      age: '',
      gender: ''
    }
  }

  addPassenger() {
    this.bookingObject.passengers.push(this.createPassenger());
  }

  removePassenger(index: number) {
    this.bookingObject.passengers.splice(index, 1);  
  }

 confirmBooking() {
  const ownerEmail = this.userStore.getEmail();
  if (!ownerEmail) {
    console.error('User not logged in');
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
    }
  });
}
}

