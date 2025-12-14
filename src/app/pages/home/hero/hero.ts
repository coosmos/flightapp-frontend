import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css']
})
export class Hero {
  searchData = {
    from: '',
    to: '',
    departure: '',
    return: '',
    passengers: 1,
    tripType: 'roundtrip'
  };

  onSearch() {
    console.log('Search data:', this.searchData);
    // Add your search logic here
  }

  swapLocations() {
    const temp = this.searchData.from;
    this.searchData.from = this.searchData.to;
    this.searchData.to = temp;
  }
}