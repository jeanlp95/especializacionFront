import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  links = [
    { path: '/home', label: 'Home' },
    { path: '/class1', label: 'Class 1' },
    { path: '/class2', label: 'Class 2' },
    { path: '/class3', label: 'Class 3' }
  ];
}
