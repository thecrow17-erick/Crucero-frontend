import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: "./landing-page.component.html",
})
export class LandingPageComponent  implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Initialize any data or services required for the landing page
  }

  // Method to scroll to a specific section when navigation links are clicked
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Method for the mobile menu toggle
  toggleMobileMenu(): void {
    // Logic to toggle mobile menu visibility
  }
}
