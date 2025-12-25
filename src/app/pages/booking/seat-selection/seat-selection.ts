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
  seatMap: SeatRow[]=[];
  passengers:any[]=[];
  bookingData:any; 
  activePassengerIndex:number=0;
  selectedSeatsMap=new Map<number,Seat>();
  constructor(
    private bookingStore: BookingStoreService,
    private router: Router,
    private bookingService: BookingService,
    private userStore: UserStoreService
  ) { }

  ngOnInit(): void {
    this.bookingData=this.bookingStore.getBooking();
    console.log(this.bookingData);
    if(this.bookingData&& this.bookingData.passengers){
      this.passengers=this.bookingData.passengers;
    }else{
      alert("No booking data found");
      console.log("No booking data found");
      this.router.navigate(['/']);
    }
   this.generateSeatConfig();
  }

  private generateSeatConfig() {
    const rows=10;
    const cols=['A','B','C','D','E','F'];
    for(let i=1; i<rows ;i++){
      const rowSeats: Seat[]=[];
      cols.forEach(col=>{
        rowSeats.push({
          id:`${i}${col}`,
          row:i,
          column:col
        });
      });
      this.seatMap.push({
        rowNumber:i,
        seats:rowSeats
      });
    }
  }

  selectPassenger(index: number) {
    this.activePassengerIndex=index;
    console.log(this.activePassengerIndex);
  }

  onSeatClick(seat: Seat) {
    /* 
      TODO: Implement logic:
      1. Check if seat is occupied
      2. Check if seat is taken by another passenger
      3. Assign seat to current passenger OR unassign if already selected
      4. Auto-advance to next passenger
    */
  }

  isSeatSelected(seatId: string): boolean {
    // TODO: Return true if seat is in the selected map
    return false;
  }

  isSeatSelectedByActive(seatId: string): boolean {
    // TODO: Return true if seat belongs to currently active passenger
    return false;
  }

  getSeatForPassenger(index: number): string {
    return this.selectedSeatsMap.get(index)?.id || 'Not selected';
  }

  confirmSelection() {
    /*
      TODO: Finalize Booking
      1. Validate all passengers have seats
      2. Check user login
      3. Build API payload (flight + passengers w/ seat info)
      4. Call createBooking API
      5. Navigate to confirmation
    */
  }
}