import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingStoreService } from '../../../services/booking-store.service';
import { Router } from '@angular/router';
import { BookingService } from '../../../services/booking.service';
import { UserStoreService } from '../../../services/user.store.service';

export interface Seat {
  id: string;
  row: number;
  column: string;
}

export interface SeatRow {
  rowNumber: number;
  seats: Seat[];
}

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.html',
  styleUrls: ['./seat-selection.css']
})
export class SeatSelection implements OnInit {
  seatMap: SeatRow[] = [];
  passengers: any[] = [];
  bookingData: any; // Store full booking data
  activePassengerIndex: number = 0;
  selectedSeatsMap = new Map<number, Seat>();

  constructor(
    private bookingStore: BookingStoreService,
    private router: Router,
    private bookingService: BookingService,
    private userStore: UserStoreService
  ) { }

  ngOnInit(): void {
    this.bookingData = this.bookingStore.getBooking();
    if (this.bookingData && this.bookingData.passengers) {
      this.passengers = this.bookingData.passengers;
    } else {
      alert('No booking data found. Redirecting to home.');
      this.router.navigate(['/']);
    }
    this.generateSeatConfig();
  }

  private generateSeatConfig() {
    const rows = 10;
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let i = 1; i <= rows; i++) {
      const rowSeats: Seat[] = [];
      cols.forEach(col => {
        rowSeats.push({
          id: `${i}${col}`,
          row: i,
          column: col
        });
      });
      this.seatMap.push({ rowNumber: i, seats: rowSeats });
    }
  }

  selectPassenger(index: number) {
    this.activePassengerIndex = index;
  }

  onSeatClick(seat: Seat) {
    // Check if seat is taken by another passenger
    for (let [idx, selectedSeat] of this.selectedSeatsMap) {
      if (selectedSeat.id === seat.id && idx !== this.activePassengerIndex) {
        alert('This seat is already selected by another passenger.');
        return;
      }
    }

    // Toggle seat for active passenger
    if (this.selectedSeatsMap.get(this.activePassengerIndex)?.id === seat.id) {
      this.selectedSeatsMap.delete(this.activePassengerIndex);
    } else {
      this.selectedSeatsMap.set(this.activePassengerIndex, seat);

      // Auto-move to next passenger
      if (this.activePassengerIndex < this.passengers.length - 1) {
        this.activePassengerIndex++;
      }
    }
  }

  isSeatSelected(seatId: string): boolean {
    return Array.from(this.selectedSeatsMap.values()).some(s => s.id === seatId);
  }

  isSeatSelectedByActive(seatId: string): boolean {
    return this.selectedSeatsMap.get(this.activePassengerIndex)?.id === seatId;
  }

  getSeatForPassenger(index: number): string {
    return this.selectedSeatsMap.get(index)?.id || 'Not Selected';
  }

  confirmSelection() {
    if (this.selectedSeatsMap.size < this.passengers.length) {
      alert('Please select seats for all passengers.');
      return;
    }

    const ownerEmail = this.userStore.getEmail();
    if (!ownerEmail) {
      alert('Please log in to continue');
      return;
    }

    // 1. Update passengers arrays with seat assignments
    const passengersWithSeats = this.passengers.map((p, index) => {
      const seat = this.selectedSeatsMap.get(index);
      return {
        ...p,
        seatNumber: seat?.id
      };
    });

    const flight = this.bookingData.flight;

    // 2. Construct Payload
    const payload = {
      flightNumber: flight.flightNumber,
      ticketPrice: flight.price, // Note: You might want to add seat prices here later
      airline: flight.airline,
      source: flight.source,
      destination: flight.destination,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      passengers: passengersWithSeats,
      contactEmail: this.bookingData.contactEmail,
      contactPhone: this.bookingData.contactPhone,
      bookingOwnerEmail: ownerEmail
    };

    console.log('Sending booking payload:', payload);

    // 3. Call API
    this.bookingService.createBooking(payload).subscribe({
      next: (response) => {
        const bookingForUI = {
          ...response,
          departureTime: flight.departureTime, // Ensure these exist for the confirmation page
          arrivalTime: flight.arrivalTime,
          source: flight.source,
          destination: flight.destination
        };

        this.bookingStore.setBooking(bookingForUI);
        this.router.navigate(['/booking-state']);
      },
      error: (err) => {
        console.error('Booking failed', err);
        alert('Booking failed. Please try again.');
      }
    });
  }
}