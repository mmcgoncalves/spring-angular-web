import { HomeComponent } from './components/home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/security/login/login.component';
import { ModuleWithProviders } from '@angular/core';

export const ROUTES: Routes = [
    { path: 'login' , component: LoginComponent },
    { path: '' , component:  HomeComponent /*, canActivate: [AuthGuard]*/},
   /* { path: 'user-new' , component: UserNewComponent, canActivate: [AuthGuard] },
    { path: 'user-new/:id' , component: UserNewComponent, canActivate: [AuthGuard] },
    { path: 'user-list' , component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'ticket-new' , component: TicketNewComponent, canActivate: [AuthGuard] },
    { path: 'ticket-new/:id' , component: TicketNewComponent, canActivate: [AuthGuard] },
    { path: 'ticket-list' , component: TicketListComponent, canActivate: [AuthGuard] },
    { path: 'ticket-detail/:id' , component: TicketDetailComponent, canActivate: [AuthGuard] },
    { path: 'summary' , component: SummaryComponent, canActivate: [AuthGuard] }*/

];

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);
