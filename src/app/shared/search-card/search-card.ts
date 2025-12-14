import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-card.html',
  styleUrls: ['./search-card.css']
})
export class SearchCardComponent {
  fromLocation: string = '';
  toLocation: string = '';
  flightDate: string = '';

  swapLocations(): void {
    const temp = this.fromLocation;
    this.fromLocation = this.toLocation;
    this.toLocation = temp;
  }

  onSearch(): void {
    const searchData = {
      from: this.fromLocation,
      to: this.toLocation,
      date: this.flightDate
    };

    console.log('Search data:', searchData);
    // Add your search logic here
    // You can emit an event or call a service
  }
}