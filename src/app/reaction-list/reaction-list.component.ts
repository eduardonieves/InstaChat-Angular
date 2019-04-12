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
import {DashboardHashtagDataSource} from '../dashboard/dashboard.component';


export class  Reaction {
  constructor(
    public username: string,
  public date: string,
  public type: string
  ) {}
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
  endedFetchLikes = false;
  endedFetchDislikes = false;
  likesResults: any[];
  dislikesResults: any[];

  public reactsList =  Array<Reaction>();


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
        this.endedFetchLikes = false;
        console.log(data['User']);
        this.likesResults = data['User'];
        this.likesResults.forEach(item => {
          console.log(item);
          const like = new Reaction(item['first_name'] + ' ' + item['last_name'], item['react_date'], 'like' );
          this.reactsList.push(like);
        });
       this.endedFetchLikes = true;
      });
    this.server.getPostUserReactions(this.id, 'dislike').subscribe(
      data => {
        this.endedFetchDislikes = false;
        console.log(data['User']);
        this.dislikesResults = data['User'];
        this.dislikesResults.forEach(item => {
          console.log(item);
          const dislike = new Reaction(item['first_name'] + ' ' + item['last_name'], item['react_date'], 'dislike' );
          this.reactsList.push(dislike);
        });
       this.endedFetchDislikes = true;
      });
    // this.endedFetch = true;

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
  constructor(private reactService: RemoteServerService, private post_id: string, private type: string) {
    super();
  }
  connect(): Observable<User[]> {

    return this.reactService.getPostUserReactions(this.post_id, this.type);
  //  return data;
  }
  disconnect() {}
}
