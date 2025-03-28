import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/']);
  }
  
  ngOnInit() {
    if (!this.authService.getUsername()) {
      this.router.navigate(['/auth']);
    }
  }
}
