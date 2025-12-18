import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightStoreService } from '../../services/flight-store.service';
import { SearchCardComponent } from '../../shared/search-card/search-card';
import { FlightService } from '../../services/flight.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-results',
  imports: [CommonModule, SearchCardComponent],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults {

  flights: any[] = [];
  hasResults = true;

  search={
    source:'',
    destination:'',
    date:''
  }
  constructor(private store: FlightStoreService,
    private flightService: FlightService,
    private router:Router
  ) {}

  ngOnInit() {
    const data = this.store.getFlights();

    if (!data || (Array.isArray(data) && data.length === 0)) {
      this.hasResults = false;
      return;
    }
    this.flights = Array.isArray(data) ? data : [data];

    console.log('SEARCH RESULTS:', this.flights);
  }


  getDuration(start:string, end:string):string{
    const startTime=new Date(start);
    const endTime=new Date(end);
    const diff=endTime.getTime()-startTime.getTime();
    const hours=Math.floor(diff/(1000*60*60));
    const minutes=Math.floor((diff%(1000*60*60))/(1000*60));
    return `${hours}h ${minutes}m`;
  }

  onModifySearch(payload:any){
    console.log('Modify Search triggered',payload);
    this.flightService.searchFlights(payload).subscribe({
      next:(res)=>{
        this.flights=Array.isArray(res)?res:[res];
        this.hasResults=this.flights.length>0;
        this.store.setFlights(this.flights);
      },
      error:(err)=>{
        console.error('FLIGHT SEARCH ERROR:', err);
      }
    });

  }

  onSelectFlight(flight:any){

    this.store.setSelectedFlight(flight);
    this.router.navigate(['/booking']);
  }

}
