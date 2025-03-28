import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.services';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  private readonly route = inject(ActivatedRoute);
  roomName!: string;
  participants!: any[];

  constructor(private router: Router, private roomService: RoomService, private authService: AuthService) {}

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    if (!code) {
      this.router.navigate(['/']);
      return;
    }

    const username = this.authService.getUsername();
    if (!username) {
      this.router.navigate(['/']);
      return;
    }

    this.roomService.getRoom(username, code).subscribe(response => {
      this.roomName = response.room_name;
    });
    
  }
}
