import { Component } from '@angular/core';
import { Navbar } from './shared/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { LoaderOverlay } from "./shared/loader-overlay/loader-overlay";
import { LoaderService } from './services/loader.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet, LoaderOverlay],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    showLoader: boolean = false;

    constructor(private loaderService: LoaderService
      ,private router:Router
    ) {
    this.loaderService.loading$.subscribe(
      value => this.showLoader = value
    );

    this.router.events
    .pipe(filter(event=>event instanceof NavigationEnd))
    .subscribe(()=>this.loaderService.hide());
  }

}
