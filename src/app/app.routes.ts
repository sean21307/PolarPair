import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: '', component: LandingComponent },
];
