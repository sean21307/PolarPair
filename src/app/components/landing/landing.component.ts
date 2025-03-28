import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  tags: string[] = [];
  step = 1;
  imageSrc: string | null = null;

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit() {
    if (this.authService.getUsername()) {
      this.router.navigate(['/create']);
    }
  }

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error("File input element not found.");
    }
  }

  attemptCompleteStep() {
    if (this.step === 1) {
      // check if room code is valid and stuff
      this.step++;
    } else if (this.step === 2) {
      // check if information is valid
      this.step++;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  onInterestInputKeyDown(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const tag = inputElement.value.trim();
  
    if (event.key === "Enter" && tag) {
      const words = tag.split(' ');
      if (words.length > 2) {
        this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'An interest can only have up to two words. Please try again.'});
        return;
      }

      event.preventDefault();
      this.tags.push(tag);
      inputElement.value = "";
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((tag0) => tag != tag0);
  }
  
}
