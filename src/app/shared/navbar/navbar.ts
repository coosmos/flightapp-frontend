import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { isLoggedIn, getUsername, logout ,isAdmin } from '../utils/auth.util';
import { UserStoreService } from '../../services/user.store.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar{
  isScrolled = false;
  isMobileMenuOpen = false;
  isLoggedIn = isLoggedIn;
getUsername = getUsername;
isAdmin=isAdmin;

constructor(private router: Router,private userStore: UserStoreService){}
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  onLogout() {
    logout();
    this.router.navigate(['/login']);
  }
}