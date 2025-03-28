import { Component, ElementRef, ViewChild } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  tags: string[] = [];
  step = 2;
  imageSrc: string | null = null;

  triggerFileInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error("File input element not found.");
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
      event.preventDefault();
      this.tags.push(tag);
      inputElement.value = "";
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter((tag0 => {tag != tag0}));
  }
  
}
