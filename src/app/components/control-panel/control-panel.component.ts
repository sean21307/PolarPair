import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.services';  // Import RoomService to interact with backend
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-control-panel',
  standalone: true,
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css'],
  imports: [CommonModule, RouterModule] 
})
export class ControlPanelComponent implements OnInit {
  rooms: any[] = [];  
  errorMessage: string = ''; 
  username: string | null = localStorage.getItem('username');  

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit() {
    if (this.username) {
      this.fetchRooms(this.username);  
      console.log('UserName found in localStorage', this.username);
    } else {
      console.log('No username found in localStorage');
      this.router.navigate(['/auth']);  
    }
  }

  fetchRooms(username: string) {
    console.log('Fetching rooms for username:', username);  
    this.roomService.getAllRooms(username).subscribe(
      (response) => {
        this.rooms = response;  
        this.errorMessage = '';
        console.log('Rooms fetched:', this.rooms, this.rooms.length);  
      },
      (error) => {
        this.errorMessage = 'Failed to fetch rooms. Please try again.';
        console.error('Error fetching rooms:', error);  
      }
    );
  }

  deleteRoom(roomId: string) {
    if (confirm('Are you sure you want to delete this room?')) {
      console.log('Deleting room with ID:', roomId);  
      this.roomService.deleteRoom(roomId).subscribe(
        () => {
          console.log('Room deleted, refreshing rooms...');
          this.fetchRooms(this.username!);  
        },
        (error) => {
          this.errorMessage = 'Failed to delete room. Please try again.';
          console.error('Error deleting room:', error);  
        }
      );
    }
  }
}
