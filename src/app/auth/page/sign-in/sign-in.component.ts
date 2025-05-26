import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: "./sign-in.component.html"
})
export class SignInComponent { }
