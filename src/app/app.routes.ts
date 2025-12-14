import { Routes } from '@angular/router';
import { Hero } from './pages/home/hero/hero';
import { Login } from './pages/auth/login/login';
import { Signup } from './pages/auth/signup/signup';
export const routes: Routes = [

    {path:'',component:Hero},
    { path: 'login', component: Login},
  { path: 'signup', component: Signup},
     

];
