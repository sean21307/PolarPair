import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LandingComponent } from './components/landing/landing.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'create', component: CreateRoomComponent },
    { path: '', component: LandingComponent },
];
