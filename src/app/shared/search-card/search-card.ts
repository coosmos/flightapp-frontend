import { Component,Output,EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { FlightService } from '../../services/flight.service';
import { FlightStoreService } from '../../services/flight-store.service';
@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [FormsModule],
  providers: [FlightService],
  templateUrl: './search-card.html',
  styleUrls: ['./search-card.css']
})
export class SearchCardComponent {
  fromLocation: string = '';
  toLocation: string = '';
  flightDate: string = '';

  @Output() searchEvent=new EventEmitter<any>();

  constructor(private router: Router, private loader: LoaderService,
    private flightService: FlightService,
    private store:FlightStoreService) {}

  swapLocations(): void {
    const temp = this.fromLocation;
    this.fromLocation = this.toLocation;
    this.toLocation = temp;
  }

 onSearch() {
  const payload = {
    source: this.fromLocation,
    destination: this.toLocation,
    date: this.flightDate
  };

  console.log('SEARCH PAYLOAD:', payload);

  this.loader.show();
  this.flightService.searchFlights(payload).subscribe({
    next: (response) => {
      this.store.setFlights(response);
      this.router.navigate(['/search-results']);
      this.loader.hide();
      this.searchEvent.emit(payload);
    },
    error: (err) => {
      console.error('FLIGHT SEARCH ERROR:', err);
      this.loader.hide();
    }
  });
}

}