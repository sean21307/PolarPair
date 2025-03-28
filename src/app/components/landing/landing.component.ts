import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { MatchService } from '../../services/match.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.services';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('codeInput') codeInput!: ElementRef<HTMLInputElement>;
  userForm!: FormGroup;

  code: string = '';
  tags: string[] = [];
  step = 1;
  imageSrc: string | null = null;

  constructor(private roomService: RoomService, private fb: FormBuilder, private authService: AuthService, private router: Router, private notificationService: NotificationService, private matchService: MatchService) {}

  ngOnInit() {
    if (this.authService.getUsername()) {
      this.router.navigate(['/create']);
      return;
    }

    this.createForm();
  }

  private createForm() {
    this.userForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        interests: ['', [Validators.required]],
        image: [null, [Validators.required]],
      },
    );
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
      // 71904
      this.roomService.getRoom("", this.codeInput.nativeElement.value).subscribe(result => {
        this.step++;
        this.code = this.codeInput.nativeElement.value;
      }, err => {
        this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'You must enter a valid room code. Please try again.'});
      });
    } else if (this.step === 2) {
      // check if information is valid

      if (this.tags.length < 2) {
        this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'You must have at least two interests. Please try again.'});
        return;
      }

      this.roomService.joinRoom(this.code, this.userForm.value.name, this.userForm.value.interests, this.userForm.value.image).subscribe(result => {
        this.step++;
      }, err => {
        this.notificationService.addNotification({variant: 'danger', title:'Oops!', message:'Something went wrong. Please try again.'});
      });
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.userForm.patchValue({ image: file });
      this.userForm.get('image')?.updateValueAndValidity();
    }

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
      this.updateInterestsFormControl();
      inputElement.value = "";
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((tag0) => tag != tag0);
    this.updateInterestsFormControl();
  }

  updateInterestsFormControl() {
    this.userForm.patchValue({ interests: this.tags.join(',') });
  }
  
}
