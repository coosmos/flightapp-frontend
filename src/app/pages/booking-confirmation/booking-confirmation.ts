import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingStoreService } from '../../services/booking-store.service';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css',
})
export class BookingConfirmation {

  booking: any = null;
  isCancelling = false;

  constructor(
    private bookingStore: BookingStoreService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.booking = this.bookingStore.getBooking();
  }

  get isCancelled(): boolean {
    return this.booking?.status === 'CANCELLED';
  }

 get canCancel(): boolean {
  if (!this.booking || this.isCancelled) return false;
  if (!this.booking.departureTime) return false;
  const departureDate = new Date(this.booking.departureTime);
  const now = new Date();
  const hoursDiff =
    (departureDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  return hoursDiff >= 24;
}

  cancelBooking() {
    if (!this.booking || !this.canCancel) return;

    const confirmed = window.confirm(
      `Are you sure you want to cancel booking PNR ${this.booking.pnr}?`
    );
    if (!confirmed) return;
    this.isCancelling = true;
    this.bookingService.cancelBooking(this.booking.pnr).subscribe({
      next: () => {
        this.booking.status = 'CANCELLED';
        this.isCancelling = false;
      },
      error: () => {
        alert('Failed to cancel booking. Please try again.');
        this.isCancelling = false;
      }
    });
  }
}