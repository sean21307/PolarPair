import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';  // Import FormsModule


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],  
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  loginUser() {
    const credentials = { username: this.username, password: this.password };
    this.authService.loginUser(credentials).subscribe(
      (response) => {
        this.authService.storeUserData(response);
        this.isLoggedIn = true;
        this.errorMessage = '';  
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
        this.authService.storeUserData(response);  
        this.isLoggedIn = true;
        this.errorMessage = ''; 
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please try again.'; 
        this.isLoggedIn = false;
      }
    );
  }

  logoutUser() {
    this.authService.logoutUser().subscribe(
      () => {
        this.isLoggedIn = false;
        this.authService.removeUserData();
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Logout failed. Please try again.'; 
      }
    );
  }
}
