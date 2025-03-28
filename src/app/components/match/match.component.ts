import { Component } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [],
  templateUrl: './match.component.html',
  styleUrl: './match.component.css'
})
export class MatchComponent {
  constructor(private matchService: MatchService, private router: Router) {}
  matchData!: { name: string; image: string; prompt: string };
  userData!: { name: string; image: string };

  ngOnInit() {
    let matchData = this.matchService.getMatchData();
    let userData = this.matchService.getUserData();
    if (!matchData || !userData) {
      this.router.navigate(['/']);
      return;
    }

    this.matchData = matchData;
    this.userData = userData;
  }
}
