import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import {DataSource} from '@angular/cdk/collections';
import { NotificationService } from './../bussiness-logic/notifications.service';
import {Chats} from '../bussiness-logic/Chats';
import { User } from './../bussiness-logic/User';
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-messages',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  id: string;
  chat: Chats;

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
        // this.chat = data['Chat'];
        // console.log(this.chatlist);
      });

  }

  goToChats() {
    this.router.navigate(['chatsList']);
  }
  goToChat(id: string) {
    console.log(id);
    this.router.navigate(['chatsList/chat/', id ]);
  }
  goToProfile() {
    this.router.navigate(['profile']);
  }
  goToDashboard() {
    this.router.navigate(['dashboard']);
  }
}
