import { Component } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.services';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent {
  constructor(private matchService: MatchService, private router: Router, private roomService: RoomService) {}
  matchData!: { name: string; image: string; prompt: string };
  userData!: { name: string; image: string };
  lastPrompt = null;

  checkGameStatus() {
    this.roomService.getPairing(localStorage.getItem('code') ?? '', localStorage.getItem('yourName') ?? '').subscribe(response => {
      if (response.confirmed == true) {
        this.matchService.storeMatchData({
          name: response.partner,
          image: response.image,
          prompt: response.icebreaker,
        });

        if (localStorage.getItem('prompt') !== response.icebreaker) {
          window.location.reload();
          localStorage.setItem('prompt', response.icebreaker)
          this.lastPrompt = response.icebreaker;
        }
       
      }
    })
  }

  ngOnInit() {
    let matchData = this.matchService.getMatchData();
    let userData = this.matchService.getUserData();
    if (!matchData || !userData) {
      this.router.navigate(['/']);
      return;
    }

    this.matchData = matchData;
    this.userData = userData;

    setInterval(() => this.checkGameStatus(), 5000);
  }
}
