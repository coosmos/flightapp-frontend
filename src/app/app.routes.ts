import { Routes } from '@angular/router';
import { Hero } from './pages/home/hero/hero';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { authGuard } from './shared/guards/auth.guard';
import { SearchResults } from './pages/search-results/search-results';
import { BookingComponent } from './pages/booking/booking/booking';
import { BookingConfirmation } from './pages/booking-confirmation/booking-confirmation';
import { BookingHistory } from './pages/booking-history/booking-history';
import { AddFlight } from './pages/add-flight/add-flight';
import { adminGuard } from './shared/guards/admin.guard';
import { Profile } from './pages/profile/profile';
import { ChangePassword } from './pages/auth/change-password/change-password';
import { SeatSelection } from './pages/booking/seat-selection/seat-selection';

export const routes: Routes = [

  { path: '', component: Hero, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'search-results', component: SearchResults },
  { path: 'booking', component: BookingComponent },
  { path: 'booking-state', component: BookingConfirmation },
  { path: 'booking-history', component: BookingHistory },
  { path: 'add-flight', component: AddFlight, canActivate: [adminGuard, authGuard] },
  { path: 'profile', component: Profile },
  { path: 'change-password', component: ChangePassword },
  {path:'booking/seats-selection',component:SeatSelection}
];
