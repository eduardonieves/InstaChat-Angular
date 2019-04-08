import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatListModule,
  MatToolbarModule,
  MatIconModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentLayoutModule } from '@covalent/core/layout';
import { CovalentStepsModule  } from '@covalent/core/steps';

import { HeaderComponent } from './header/header.component';
import { LoginComponent} from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RemoteServerService } from './bussiness-logic/remote-server.service';
import { AuthGuard } from './bussiness-logic/auth-guard.service';
import { NotificationService } from './bussiness-logic/notifications.service';
import { DashboardComponent } from './dashboard/dashboard.component';


import { AppComponent } from './app.component';
import { ChatsListComponent } from './chatsList/chatsList.component';
import { ChatComponent } from './chat/chat.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';




const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { name: 'Login' } },
  { path: 'profile', component: ProfileComponent, data: { name: 'Profile' } },
  { path: 'dashboard', component: DashboardComponent, data: { name: 'Dashboard' } },
  { path: 'chatsList', component: ChatsListComponent, data: { name: 'Chats' } },
  { path: 'chatsList/chat/:id', component: ChatComponent, data: { name: 'Chat'} },
  { path: 'chatsList/chat/chatInfo/:id', component: ChatInfoComponent, data: { name: 'ChatInfo'} },

  // { path: 'register', component: RegisterComponent },
  // { path: 'admin', redirectTo: '/admin/home', pathMatch: 'full' },
  {
    path: 'home', component: HeaderComponent, canActivate: [AuthGuard], data: {
      name: 'Home',
      title: 'Home'
    }, children: [
      { path: '', component: HomeComponent }
    ]
  },
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    PageNotFoundComponent,
    HomeComponent,
    ProfileComponent,
    DashboardComponent,
    ChatsListComponent,
    ChatComponent,
    ChatInfoComponent,
  ],
  imports: [
    BrowserModule,
    // MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    CovalentLayoutModule,
    MatCardModule,
    CovalentStepsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [RemoteServerService, AuthGuard, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
