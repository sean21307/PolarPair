import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastNotificationComponent } from './components/toast-notification/toast-notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PolarPair';
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://polar-pair-backend.vercel.app/prompt/test/').subscribe(config => {
      console.log('aaa');
    });
  }
}
