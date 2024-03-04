import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent {
  // Define fake data
  fakeData = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 3, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 4, name: 'John Doe', email: 'john@example.com' },
    { id: 5, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 6, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 7, name: 'John Doe', email: 'john@example.com' },
    { id: 8, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 9, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 10, name: 'John Doe', email: 'john@example.com' },
    { id: 11, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 12, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 13, name: 'John Doe', email: 'john@example.com' },
    { id: 14, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 15, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 16, name: 'John Doe', email: 'john@example.com' },
    { id: 17, name: 'Jane Doe', email: 'jane@example.com' },
    { id: 18, name: 'Bob Smith', email: 'bob@example.com' },
  ];
}