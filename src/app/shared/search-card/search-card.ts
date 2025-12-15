import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
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

  constructor(private router: Router, private loader: LoaderService) {}

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
    this.loader.show();
  this.router.navigate(['/search-results']);
  }
}