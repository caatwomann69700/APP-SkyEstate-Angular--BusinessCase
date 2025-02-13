import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { CategorySectionComponent } from "../../components/category-section/category-section.component";
import { ChatComponent } from "../../components/chat/chat.component";
import { WhyTrustUsComponent } from "../../components/why-trust-us/why-trust-us.component";
import { AnnonceCardComponent } from "../../components/annonce-card/annonce-card.component";
import { QuiSommesNousComponent } from "../../components/qui-sommes-nous/qui-sommes-nous.component";




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CategorySectionComponent, ChatComponent, WhyTrustUsComponent, AnnonceCardComponent, QuiSommesNousComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
