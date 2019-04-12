import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RemoteServerService} from '../bussiness-logic/remote-server.service';
import {NotificationService} from '../bussiness-logic/notifications.service';
import {MatDialog} from '@angular/material';
import {Chats} from '../bussiness-logic/Chats';
import {DashboardPost, DashboardPostDataSource} from '../dashboard/dashboard.component';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {User} from '../bussiness-logic/User';



@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.scss']
})
export class ChatInfoComponent implements OnInit {

  id: string;
  chat: Chats;
  owner: User;

  dataSource: MembersDataSource;
  displayedColumns = ['name', 'user_id'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private server: RemoteServerService,
    private notifications: NotificationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {


    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);

    this.server.getChatById(this.id).subscribe(
      data => {
        console.log(data['Chat']);
        this.chat = data['Chat'];

        this.server.getChatUsers(this.chat.chat_id).subscribe(
          data2 => {
            console.log(data2);
            this.dataSource = new MembersDataSource(this.server, this.chat);
            this.dataSource = data2['Chat'];
          },
          error => {
            console.log(error);
            this.notifications.httpError(error);
          }
        );

        this.server.getSingleUser('1').subscribe(
          data2 => {
            console.log(data2);
            this.owner = data2['User'];
          },
          error => {
            console.log(error);
            this.notifications.httpError(error);
          }
        );
      });



  }

  backToChat() {
    this.router.navigate(['chatsList/chat/', this.chat.chat_id]);
  }
  goToChats() {
    this.router.navigate(['chatsList']);
  }
  goToProfile() {
    this.router.navigate(['profile']);
  }
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
export class MembersDataSource extends DataSource<any> {
  constructor(private membersService: RemoteServerService, private chat: Chats) {
    super();
  }
  connect(): Observable<User[]> {
    return this.membersService.getChatUsers(this.chat.chat_id);
  }
  disconnect() {}
}
