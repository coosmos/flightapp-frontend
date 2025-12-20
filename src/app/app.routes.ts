import { Routes } from '@angular/router';
import { Hero } from './pages/home/hero/hero';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { authGuard } from './shared/guards/auth.guard';
import { SearchResults } from './pages/search-results/search-results';  
import { BookingComponent } from './pages/booking/booking/booking';
import { BookingConfirmation } from './pages/booking-confirmation/booking-confirmation';
export const routes: Routes = [

    {path:'',component:Hero,canActivate:[authGuard]},
    { path: 'login', component: Login},
  { path: 'signup', component: Signup},
     {path:'search-results',component:SearchResults},
     {path: 'booking',component:BookingComponent},
     {path:'booking-state',component:BookingConfirmation}
];
