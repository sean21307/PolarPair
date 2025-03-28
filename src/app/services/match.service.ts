import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor() { }

  getMatchData(): { name: string; image: string; prompt: string } | undefined {
    // temp
    if (2 + 2 === 4) {
      return {
        name: 'Patrick',
        image: '',
        prompt: "How do ocean currents match up to transformers' alternate modes?"
      }
    }

    const name = localStorage.getItem('matchName');
    const image = localStorage.getItem('matchImage');
    const prompt = localStorage.getItem('matchPrompt');
  
    if (!name || !image || !prompt) return;
  
    return { name, image, prompt };
  }
  
  storeMatchData(response: any) {
    localStorage.setItem('matchName', response.name);
    localStorage.setItem('matchImage', response.image);
    localStorage.setItem('matchPrompt', response.prompt);
  }

  getUserData(): { name: string; image: string } | undefined {
    const name = localStorage.getItem('yourName');
    const image = localStorage.getItem('yourImage');
  
    if (!name || !image) return;
  
    return { name, image };
  }

  storeUserData(response: any) {
    localStorage.setItem('yourName', response.name);
    localStorage.setItem('yourImage', response.image);
  }

  removeMatchData(): void {
    localStorage.removeItem('match');
  }
}
