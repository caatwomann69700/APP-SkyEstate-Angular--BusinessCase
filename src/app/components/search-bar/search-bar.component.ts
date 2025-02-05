import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  filters = {
    category: '',
    city: '',
    maxOccupants: '',
    priceMin: '',
    priceMax: ''
  };

  constructor(private router: Router) {}

  onSearch(): void {
    this.router.navigate(['/filtered-annonces'], { queryParams: this.filters });
  }
}
