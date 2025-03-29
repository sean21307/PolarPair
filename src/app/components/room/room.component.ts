import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.services';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  private readonly route = inject(ActivatedRoute);
  code!: string;
  roomName!: string;
  participants!: {interests: string[], name: string, image: string}[];
  pairings!: {Person1: string, Person2: string, icebreaker: string, Person1_image: string, Person2_image: string}[];
  screen = 'default';
  generating = false;

  constructor(private router: Router, private roomService: RoomService, private authService: AuthService, private notificationService: NotificationService) {}

  removeParticipant(participant: {interests: string[], name: string, image: string}) {
    this.roomService.deleteParticipant(this.code, participant.name).subscribe(result => {
      this.participants = this.participants.filter((p) => p != participant);
    }, err => {
      this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'Something went wrong when deleting participant. Please try again.'});
    })
  }

  sendPrompts() {
    this.roomService.confirmPairings(this.code).subscribe(response => {
      this.notificationService.addNotification({variant: 'success', title:'Success!', message:'Successfully sent icebreakers to pairs!'});
    }, err => {
      this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'Something went wrong when sending icebreakers. Please try again.'});
    });
  }

  startRound() {
    if (!this.participants || this.participants.length < 2) {
      this.notificationService.addNotification({variant: 'warning', title:'Oops!', message:'There must be at least two participants to begin a round. Please try again.'});
      return;
    }

    this.generating = true;
    this.roomService.createPairing(this.code).subscribe(response => {
      this.notificationService.addNotification({variant: 'success', title:'Success!', message:'Successfully generated new icebreakers!'});
      this.generating = false;
      this.pairings = response.pairings;
      this.screen = 'pairing';
    }, err => {
      this.generating = false;
      this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'Something went wrong when generating icebreakers. Please try again.'});
    });
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

    this.roomService.getPairings(code).subscribe(response => {
      this.pairings = response.pairings;
      if (response.pairings.length !== 0) {
        this.screen = 'pairing';
      }
    })
    
  }
}
