import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import { NotificationService } from './../bussiness-logic/notifications.service';
import { User } from './../bussiness-logic/User';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public username: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private server: RemoteServerService,
    private notifications: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.email = '';
    this.password = '';
    this.username = '';
    this.firstName = '';
    this.lastName = '';
  }

  createAccount() {
    console.log('Creating Account');
    console.log(this.email);
    console.log(this.password);
    console.log(this.username);
    console.log(this.firstName);
    console.log(this.lastName);

    this.server.register(this.email, this.password, this.username, this.firstName, this.lastName).subscribe(
      res => {
       // this.loading = false;
        console.log('Account Created');
        this.router.navigate(['profile']);
      },
      error => {
        console.log('Error');

        this.notifications.httpError(error);
      }
    );  }

  back() {
    this.router.navigate(['/login']);
  }


}
