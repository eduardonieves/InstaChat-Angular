import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
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
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RemoteServerService } from './bussiness-logic/remote-server.service';
import { AuthGuard } from './bussiness-logic/auth-guard.service';
import { NotificationService } from './bussiness-logic/notifications.service';



import { AppComponent } from './app.component';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { name: 'Login' } },
  // { path: 'register', component: RegisterComponent },
  // { path: 'admin', redirectTo: '/admin/home', pathMatch: 'full' },
  {
    path: 'home', component: HeaderComponent, canActivate: [AuthGuard], data: {
      name: 'Home',
      title: 'Home'
    }, children: [
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatInputModule,
    MatButtonModule,
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
    MatProgressBarModule,
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
