import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import { NotificationService } from './../bussiness-logic/notifications.service';
import { User } from './../bussiness-logic/User';
import {Chats} from '../bussiness-logic/Chats';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-chats',
  templateUrl: './chatsList.component.html',
  styleUrls: ['./chatsList.component.scss']
})
export class ChatsListComponent implements OnInit {

  chatlist: Chats[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private server: RemoteServerService,
    private notifications: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {

    this.server.getAllChats().subscribe(
      data => {
      //  console.log(data);
        this.chatlist = data['Chat'];
        console.log(this.chatlist);
  });
  }

  goToChats(id: string) {
    console.log(id);
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
