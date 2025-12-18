import { Component } from '@angular/core';
import { BookingService } from '../../../services/booking.service';
import { FlightStoreService } from '../../../services/flight-store.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [FormsModule,CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class BookingComponent {

  selectedFlight: any;
  
  bookingObject ={
     "contactEmail": '',
  "contactPhone": '',
   passengers:[{
    "firstName":'',
    "lastName":'',
    "age":'',
    "gender":'',
  }]
  }

  constructor(
    private store: FlightStoreService,
    private bookingService:BookingService
   ) { }
 
  ngOnInit(){
    this.selectedFlight=this.store.getSelectedFlight();
    console.log('selected flight', this.selectedFlight);
  }

  confirmBooking(){
    
   // need to  get payload -> sent to booking service 
   const payload={

     flightNumber: this.selectedFlight.flightNumber,
     ticketPrice:this.selectedFlight.price,
     
     passengers:[this.bookingObject.passengers],
     contactEmail:this.bookingObject.contactEmail,
     contactPhone:this.bookingObject.contactPhone
   }

    console.log('booking payload ' , payload);

    this.bookingService.createBooking(payload).subscribe({
      next: (response)=>{
        //need to recieve payload and update the UI
        // create a booking store 
        console.log('booking response ' , response);
      },error:(err)=>{
        console.log('booking error ' , err);
      }
    })

  }
 

}

