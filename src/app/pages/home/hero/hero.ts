import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchCardComponent } from "../../../shared/search-card/search-card";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchCardComponent],
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
  slides = [
  {
    image: '/assets/image1.jpg',
    city: 'Paris',
    tagline: 'Romantic Escapes',
    price: 'Flights from ₹42,999'
  },
  {
    image: '/assets/image2.jpg',
    city: 'Dubai',
    tagline: 'Luxury & Skyscrapers',
    price: 'Flights from ₹36,499'
  },
  {
    image: '/assets/image3.jpg',
    city: 'London',
    tagline: 'Classic City Vibes',
    price: 'Flights from ₹48,199'
  }
];

currentIndex = 0;

  ngOnInit() {
  setInterval(() => {
    this.currentIndex =
      (this.currentIndex + 1) % this.slides.length;
  }, 7000);
}

  onSearch() {
    console.log('Search data:', this.searchData);
  }

  swapLocations() {
    const temp = this.searchData.from;
    this.searchData.from = this.searchData.to;
    this.searchData.to = temp;
  }
  scrollToDestinations() {
  const target = document.getElementById('destinations');
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 900; 

  let start: number | null = null;

  function animation(currentTime: number) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, startPosition + distance * easeInOut(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  function easeInOut(t: number) {
    return t < 0.5
      ? 2 * t * t
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  requestAnimationFrame(animation);
}


}