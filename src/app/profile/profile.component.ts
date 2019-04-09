import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import { NotificationService } from './../bussiness-logic/notifications.service';
import { User } from './../bussiness-logic/User';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {DashboardPost, DashboardPostDataSource} from '../dashboard/dashboard.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user = new User(localStorage.getItem('first_name'), localStorage.getItem('last_name'), localStorage.getItem('user_id')
  , localStorage.getItem('u_email_address'), localStorage.getItem('phone'), localStorage.getItem('username'));

  dataSource: UserContactsDataSource;
  contactList: User[];
  // dataSource = new UserContactsDataSource(this.server);
  displayedColumns = ['Name', 'user_id'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private server: RemoteServerService,
    private notifications: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log(this.user);

    this.server.getUserContacts(localStorage.getItem('user_id')).subscribe(
      data => {
        console.log(data);

        this.dataSource = new UserContactsDataSource(this.server);
        this.dataSource = data['Contact'];
       // this.contactList = data['User'];
      }
    );
    // this.contactsSource = this.user;
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
  goToChats() {
    this.router.navigate(['chatsList']);
  }
}
export class UserContactsDataSource extends DataSource<any> {
  constructor(private contactsService: RemoteServerService) {
    super();
  }
  connect(): Observable<User[]> {
    console.log('Here');
    return this.contactsService.getUserContacts(localStorage.getItem('user_id'));
  }
  disconnect() {}
}
