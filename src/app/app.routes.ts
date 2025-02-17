import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LegalMentionsComponent } from './components/legal-mentions/legal-mentions.component';
import { FonctionnementComponent } from './components/fonctionnement/fonctionnement.component';
import { AnnoncesPageComponent } from './pages/annonces-page/annonces-page.component';
import { AnnonceDetailComponent } from './pages/annonce-detail/annonce-detail.component';
import { FilteredAnnoncesComponent } from './pages/filtered-annonces/filtered-annonces.component';
import { MessageComponent } from './pages/message/message/message.component';
import { MyAdsComponent } from './pages/user-dashboard/my-ads/my-ads.component';
import { AdminAnnoncesComponent } from './pages/admin-dashboard/admin-annonces.component';




export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'find-housing', component: AnnoncesPageComponent },
    { path: 'annonce/:id', component: AnnonceDetailComponent },
    { path: 'messages', component: MessageComponent},
    { path: 'filtered-annonces', component: FilteredAnnoncesComponent },
    { path: 'login', component: LoginComponent },
    { path: 'mentions-legales', component: LegalMentionsComponent },
    { path: 'fonctionnement', component: FonctionnementComponent },
    { path: 'user-dashboard/my-ads', component: MyAdsComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: 'admin-dashboard/annonces', component: AdminAnnoncesComponent, canActivate: [AuthGuard] },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] }, 
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/login' }, 
  ];
  
  