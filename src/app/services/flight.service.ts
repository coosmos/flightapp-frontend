import { Injectable } from "@angular/core";
import {HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class FlightService {

    private API='http://localhost:9090/api/flight/search';

    constructor(private http:HttpClient){}
    searchFlights(payload: {
    source: string;
    destination: string;
    date: string;
  }): Observable<any> {
    return this.http.post(this.API, payload);
  }

    
}