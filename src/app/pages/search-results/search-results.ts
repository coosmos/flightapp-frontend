import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults {

  flights = [
  {
    airline: 'Emirates',
    from: 'DEL',
    to: 'JFK',
    departTime: '10:00 AM',
    arriveTime: '08:00 PM',
    duration: '14h 30m',
    stops: '1 Stop',
    price: '$850'
  },
  {
    airline: 'Air India',
    from: 'DEL',
    to: 'JFK',
    departTime: '01:00 PM',
    arriveTime: '11:30 PM',
    duration: '15h 10m',
    stops: 'Non-stop',
    price: '$920'
  },
  {
    airline: 'Lufthansa',
    from: 'DEL',
    to: 'JFK',
    departTime: '02:45 AM',
    arriveTime: '04:00 PM',
    duration: '16h 20m',
    stops: '1 Stop',
    price: '$780'
  },
  {
    airline: 'Air India',
    from: 'DEL',
    to: 'JFK',
    departTime: '01:00 PM',
    arriveTime: '11:30 PM',
    duration: '15h 10m',
    stops: 'Non-stop',
    price: '$920'
  },
  {
    airline: 'Lufthansa',
    from: 'DEL',
    to: 'JFK',
    departTime: '02:45 AM',
    arriveTime: '04:00 PM',
    duration: '16h 20m',
    stops: '1 Stop',
    price: '$780'
  },
  {
    airline: 'Air India',
    from: 'DEL',
    to: 'JFK',
    departTime: '01:00 PM',
    arriveTime: '11:30 PM',
    duration: '15h 10m',
    stops: 'Non-stop',
    price: '$920'
  },
  {
    airline: 'Lufthansa',
    from: 'DEL',
    to: 'JFK',
    departTime: '02:45 AM',
    arriveTime: '04:00 PM',
    duration: '16h 20m',
    stops: '1 Stop',
    price: '$780'
  },
  {
    airline: 'Air India',
    from: 'DEL',
    to: 'JFK',
    departTime: '01:00 PM',
    arriveTime: '11:30 PM',
    duration: '15h 10m',
    stops: 'Non-stop',
    price: '$920'
  },
  {
    airline: 'Lufthansa',
    from: 'DEL',
    to: 'JFK',
    departTime: '02:45 AM',
    arriveTime: '04:00 PM',
    duration: '16h 20m',
    stops: '1 Stop',
    price: '$780'
  },
  {
    airline: 'Air India',
    from: 'DEL',
    to: 'JFK',
    departTime: '01:00 PM',
    arriveTime: '11:30 PM',
    duration: '15h 10m',
    stops: 'Non-stop',
    price: '$920'
  },
  {
    airline: 'Lufthansa',
    from: 'DEL',
    to: 'JFK',
    departTime: '02:45 AM',
    arriveTime: '04:00 PM',
    duration: '16h 20m',
    stops: '1 Stop',
    price: '$780'
  },
  {
    airline: 'Air India',
    from: 'DEL',
    to: 'JFK',
    departTime: '01:00 PM',
    arriveTime: '11:30 PM',
    duration: '15h 10m',
    stops: 'Non-stop',
    price: '$920'
  },
  {
    airline: 'Lufthansa',
    from: 'DEL',
    to: 'JFK',
    departTime: '02:45 AM',
    arriveTime: '04:00 PM',
    duration: '16h 20m',
    stops: '1 Stop',
    price: '$780'
  },
  {
    airline: 'Air India',
    from: 'DEL',
    to: 'JFK',
    departTime: '01:00 PM',
    arriveTime: '11:30 PM',
    duration: '15h 10m',
    stops: 'Non-stop',
    price: '$920'
  },
  {
    airline: 'Lufthansa',
    from: 'DEL',
    to: 'JFK',
    departTime: '02:45 AM',
    arriveTime: '04:00 PM',
    duration: '16h 20m',
    stops: '1 Stop',
    price: '$780'
  }
];

}
