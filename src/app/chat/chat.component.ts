import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import {DataSource} from '@angular/cdk/collections';
import { NotificationService } from './../bussiness-logic/notifications.service';
import {Chats} from '../bussiness-logic/Chats';
import { User } from './../bussiness-logic/User';
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';
import {Posts} from '../bussiness-logic/Posts';
import {DashboardPost} from '../dashboard/dashboard.component';


@Component({
  selector: 'app-messages',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  id: string;
  chat: Chats;
  postList: Posts[];
  postResults: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private server: RemoteServerService,
    private notifications: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    console.log(this.id);

    this.server.getChatById(this.id).subscribe(
      data => {
          console.log(data['Chat']);
          this.chat = data['Chat'];

        // console.log(this.chatlist);
      });

    this.server.getChatPosts(this.id).subscribe(
      data => {
        console.log(data['Posts']);
        this.postList = data['Posts'];
      }
    );

  }

  showChatInfo(id: string) {
    this.router.navigate(['chatsList/chat/chatInfo', this.chat.chat_id]);
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
  constructor(private membersService: RemoteServerService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.membersService.getUsers();
  }
  disconnect() {}
}
