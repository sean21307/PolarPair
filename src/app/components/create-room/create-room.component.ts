import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent {
  roomName: string = ''; 
  errorMessage: string = ''; 

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private roomService: RoomService,
    private notificationService: NotificationService
  ) {}

  createRoom() {
    const storedUsername = localStorage.getItem('username'); 
    if (storedUsername && this.roomName) {
      this.roomService.createRoom(storedUsername, this.roomName).subscribe(
        (response) => {
          this.notificationService.addNotification({variant: 'success', title:'Success!', message:`You have successfully created a room named ${this.roomName}.`});
          console.log('Room created successfully!', response);
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Failed to create room. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'Please provide a room name and ensure you are logged in.';
    }
  }
  
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
