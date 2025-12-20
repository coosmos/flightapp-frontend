import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FlightStoreService {

  private FLIGHTS_KEY = 'flights';
  private SELECTED_FLIGHT_KEY = 'selectedFlight';
  setFlights(data: any) {
    sessionStorage.setItem(this.FLIGHTS_KEY, JSON.stringify(data));
  }
  
  getFlights() {
    const data = sessionStorage.getItem(this.FLIGHTS_KEY);
    return data ? JSON.parse(data) : null;
  }
  clearFlights() {
    sessionStorage.removeItem(this.FLIGHTS_KEY);
  }

  setSelectedFlight(flight: any) {
    sessionStorage.setItem(this.SELECTED_FLIGHT_KEY, JSON.stringify(flight));
  }

  getSelectedFlight() {
    const flight = sessionStorage.getItem(this.SELECTED_FLIGHT_KEY);
    return flight ? JSON.parse(flight) : null;
  }
  clearSelectedFlight() {
    sessionStorage.removeItem(this.SELECTED_FLIGHT_KEY);
  }
  clearAll() {
    sessionStorage.clear();
  }
}
