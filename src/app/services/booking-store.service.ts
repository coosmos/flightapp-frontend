import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingStoreService {
  private BOOKING_KEY = 'bookingResponse';

  setBooking(data: any) {
    sessionStorage.setItem(this.BOOKING_KEY, JSON.stringify(data));
  }
  
  getBooking() {
    const data = sessionStorage.getItem(this.BOOKING_KEY);
    return data ? JSON.parse(data) : null;
  }

  clearBooking() {
    sessionStorage.removeItem(this.BOOKING_KEY);
  }
}
