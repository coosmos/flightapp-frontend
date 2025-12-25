import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { UserStoreService } from '../../services/user.store.service';

@Component({
  selector: 'app-booking-history',
  imports: [CommonModule],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css',
})
export class BookingHistory {

  bookings: any[] = [];
  loading = true;
  errorMessage = '';
  cancellingPnr: string | null = null;
  showCancelModal = false;
  pnrToCancel: string | null = null;

  constructor(
    private bookingService: BookingService,
    private userStore: UserStoreService
  ) { }

  ngOnInit() {
    this.loadBookingHistory();
  }
  getStatusPriority(status: string): number {
    switch (status) {
      case 'ACTIVE':
      case 'CONFIRMED':
        return 1;
      case 'COMPLETED':
        return 2;
      case 'CANCELLED':
        return 3;
      default:
        return 99;
    }
  }
  sortBookings() {
    this.bookings.sort(
      (a, b) =>
        this.getStatusPriority(a.status) -
        this.getStatusPriority(b.status)
    );
  }


  loadBookingHistory() {
    const email = this.userStore.getEmail();
    if (!email) {
      this.errorMessage = 'Please login to view booking history';
      this.loading = false;
      return;
    }

    this.bookingService.getBookingHistory(email).subscribe({
      next: (response) => {
        this.bookings = response;
        this.sortBookings();
        this.loading = false;
        console.log("bookinghistory", response)
      },
      error: (error) => {
        console.error(error);
        this.errorMessage = 'Failed to load booking history';
        this.loading = false;
      }
    });
  }

  cancelBooking(pnr: string) {
    this.pnrToCancel = pnr;
    this.showCancelModal = true;
  }

  closeModal() {
    this.showCancelModal = false;
    this.pnrToCancel = null;
  }

  confirmCancel() {
    if (!this.pnrToCancel) return;

    const pnr = this.pnrToCancel;

    // Set loading state by tracking the PNR being cancelled
    this.cancellingPnr = pnr;

    // Close the confirmation modal locally
    this.showCancelModal = false;


    this.bookingService.cancelBooking(pnr).subscribe({
      next: (response) => {
        console.log('Booking cancelled successfully', response);
        const booking = this.bookings.find(b => b.pnr === pnr);
        if (booking) {
          booking.status = 'CANCELLED';
        }
        this.cancellingPnr = null;
        this.pnrToCancel = null;
        alert('Booking cancelled successfully');
      },
      error: (error) => {
        console.error('Failed to cancel booking', error);
        this.cancellingPnr = null;
        this.pnrToCancel = null;
        alert('Failed to cancel booking. Please try again.');
      }
    });
  }

  canCancelBooking(booking: any): boolean {
    return booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED';
  }

  isCancelling(pnr: string): boolean {
    return this.cancellingPnr === pnr;
  }
}