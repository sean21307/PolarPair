import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { FormsModule } from '@angular/forms';  // Import FormsModule is used for NgModule to Bind Data Together
import { Router } from '@angular/router';

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
  isSignUp: boolean = true;  

  constructor(private authService: AuthService , private router: Router) {}

  loginUser() {
    const credentials = { username: this.username, password: this.password };
    this.authService.loginUser(credentials).subscribe(
      (response) => {
        this.authService.storeUserData(response);
        this.isLoggedIn = true;
        this.errorMessage = '';  
        console.log('Login successful!'); 
        this.router.navigate(['']); 


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
        console.log('Login successful!'); 

      },
      (error) => {
        this.errorMessage = 'Logout failed. Please try again.'; 
      }
    );
  }

  toggleAuthMode() {
    this.isSignUp = !this.isSignUp;  
  }
}
