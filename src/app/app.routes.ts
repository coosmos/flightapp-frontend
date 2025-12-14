import { Routes } from '@angular/router';
import { Hero } from './pages/home/hero/hero';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
import { authGuard } from './shared/guards/auth.guard';
export const routes: Routes = [

    {path:'',component:Hero,canActivate:[authGuard]},
    { path: 'login', component: Login},
  { path: 'signup', component: Signup},
     

];
