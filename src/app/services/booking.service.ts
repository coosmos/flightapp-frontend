import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BookingService {

    // private API='http://localhost:9090/api/flight/search';

    constructor(private http: HttpClient) { }
    //   searchFlights(payload: {
    //   source: string;
    //   destination: string;
    //   date: string;
    // }): Observable<any> {
    //   return this.http.post(this.API, payload);
    // }

    private API = 'http://localhost:9090/api/bookings';

    createBooking(payload: any) {
        return this.http.post(this.API, payload);
    }

    cancelBooking(pnr:string){
        return this.http.put(`${this.API}/${pnr}/cancel`, {});
    }

    getBookingHistory(email: string) {
  return this.http.post<any[]>(
    `${this.API}/bookingHistory`,{ email });
}



}