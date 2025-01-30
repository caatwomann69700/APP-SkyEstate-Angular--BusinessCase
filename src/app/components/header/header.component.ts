import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cities: string[] = ["Paris", "Lyon", "Marseille", "Nice", "Bordeaux", "Toulouse", "Lille", "Strasbourg"];
  currentCity: string = this.cities[0];
  private index: number = 0;

  ngOnInit(): void {
    // Mise à jour de la ville toutes les secondes
    setInterval(() => this.changeCity(), 1000);
  }

  changeCity(): void {
    this.index = (this.index + 1) % this.cities.length; // Itère les villes
    this.currentCity = this.cities[this.index];
  }
}

