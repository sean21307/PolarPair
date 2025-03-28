import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.services';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  private readonly route = inject(ActivatedRoute);
  code!: string;
  roomName!: string;
  participants!: {interests: string[], name: string, image: string}[];

  constructor(private router: Router, private roomService: RoomService, private authService: AuthService, private notificationService: NotificationService) {}

  removeParticipant(participant: {interests: string[], name: string, image: string}) {
    this.roomService.deleteParticipant(this.code, participant.name).subscribe(result => {
      this.participants = this.participants.filter((p) => p != participant);
    }, err => {
      this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'Something went wrong when deleting participant. Please try again.'});
    })
  }

  startRound() {
    if (!this.participants || this.participants.length < 2) {
      this.notificationService.addNotification({variant: 'warning', title:'Oops!', message:'There must be at least two participants to begin a round. Please try again.'});
    }
  }

  closeRoom() {
    this.roomService.deleteRoom(this.code).subscribe(result => {
      this.router.navigate(['/control']);
    }, err => {
      this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'Something went wrong when closing room. Please try again.'});
    })
  }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    if (!code) {
      this.router.navigate(['/']);
      return;
    }
    this.code = code;

    const username = this.authService.getUsername();
    if (!username) {
      this.router.navigate(['/']);
      return;
    }

    this.roomService.getRoom(username, code).subscribe(response => {
      this.roomName = response.room_name;
    });

    this.roomService.getParticipants(code).subscribe(response => {
      this.participants = response.participants;
    })
    
  }
}
