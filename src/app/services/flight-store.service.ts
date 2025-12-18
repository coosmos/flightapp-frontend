import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FlightStoreService {
  private flights: any = null;
  private selectedFlight: any = null;

  setFlights(data: any) {
    this.flights = data;
  }

  getFlights() {
    return this.flights;
  }

  clear() {
    this.flights = null;
  }

  setSelectedFlight(flight: any) {
    this.selectedFlight = flight;
  }

  getSelectedFlight() {
    return this.selectedFlight;
  }
}
