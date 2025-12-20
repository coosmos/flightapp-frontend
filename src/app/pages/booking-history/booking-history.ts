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

  bookings:any[]=[];
  loading=true;
  errorMessage='';

  constructor(
    private bookingService:BookingService,
    private userStore:UserStoreService
  ){}

  ngOnInit(){
    const email=this.userStore.getEmail();
    if (!email) {
      this.errorMessage = 'Please login to view booking history';
      this.loading = false;
      return;
    }
    this.bookingService.getBookingHistory(email).subscribe({
      next:(response)=>{
        this.bookings=response;
        this.loading=false;
      },
      error:(error)=>{
        console.error(error);
        this.errorMessage='Failed to load booking history';
        this.loading=false;
      }
    });

  }
}
