import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RemoteServerService} from '../bussiness-logic/remote-server.service';
import {NotificationService} from '../bussiness-logic/notifications.service';
import {MatDialog} from '@angular/material';
import {Chats} from '../bussiness-logic/Chats';
import {MembersDataSource} from '../chat-info/chat-info.component';
import {User} from '../bussiness-logic/User';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {Posts} from '../bussiness-logic/Posts';
import {UserContactsDataSource} from '../profile/profile.component';


export interface  Reaction {
  username: string;
  date: string;
  type: string;
}

@Component({
  selector: 'app-reaction-list',
  templateUrl: './reaction-list.component.html',
  styleUrls: ['./reaction-list.component.scss']
})


export class ReactionListComponent implements OnInit {

  id: string;
  chat: Chats;
  owner: User;

  dataSource: ReactsSource;
  displayedColumns = ['name', 'date', 'type'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private server: RemoteServerService,
    private notifications: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['post_id'];
    });

    this.server.getChatById(this.id).subscribe(
      data => {
        console.log(data['Chat']);
        this.chat = data['Chat'];

      });

    this.server.getPostUserReactions(this.id, 'like').subscribe(
      data => {
       console.log(data['User']);
       // this.chat = data['Chat'][];
      //  this.dataSource = new ReactsSource(this.server, ,'like');

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
export class ReactsSource extends DataSource<any> {
  constructor(private reactService: RemoteServerService, private post: Posts, private type: string) {
    super();
  }
  connect(): Observable<User[]> {

    return this.reactService.getPostUserReactions(this.post.post_id, this.type);
  //  return data;
  }
  disconnect() {}
}
