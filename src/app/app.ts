import { Component } from '@angular/core';
import { Hero } from './pages/home/hero/hero';
import { Navbar } from './shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [Hero, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
