import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';  // Import FormsModule is used for NgModule to Bind Data Together
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],  
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  isSignUp: boolean = false;  

  constructor(private authService: AuthService , private router: Router, private notificationService: NotificationService) {}

  ngOnInit() {
    if (this.authService.getUsername()) {
      this.isLoggedIn = true;
    }
  }

  loginUser() {
    const credentials = { username: this.username, password: this.password };
    this.authService.loginUser(credentials).subscribe(
      (response) => {
        this.authService.storeUserData(response);
        this.isLoggedIn = true;
        this.errorMessage = '';  
        console.log('Login successful!'); 
        this.router.navigate(['/control']); 
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials and try again.';  
        this.isLoggedIn = false;
      }
    );
  }

  registerUser() {
    const userData = { username: this.username, password: this.password };
    this.authService.registerUser(userData).subscribe(
      (response) => {
        this.notificationService.addNotification({variant: 'success', title:'Success!', message:'You have successfully registered. Please login.'});
        this.isSignUp = false;
        this.errorMessage = ''; 
      },
      (error) => {
        this.errorMessage = 'That username is already in use. Please try again.'; 
        this.isLoggedIn = false;
      }
    );
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;  
    this.errorMessage = '';
  }
}
