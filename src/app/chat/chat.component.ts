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
  public chat: Chats;
  postList: Posts[];

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

      });

    this.server.getChatPosts(this.id).subscribe(
      data => {
        console.log(data['Posts']);
        this.postList = data['Posts'];

        this.postList.forEach(item => {
          console.log(item);
          if (item['hashtag_name'] != null) {
            const hashtag = item['hashtag_name'];
            const caption = item['post_caption'];
            console.log(caption + ' #' + hashtag);
            item['post_caption'] = caption + ' #' + hashtag;
          }
        });


        this.postList.forEach(item => {
          this.server.getPostsReactions(item['post_id'], 'like').subscribe(
            data2 => {
              const filteredData = data2['User'][0];
              const likes = filteredData['Total_of_likes'];
              if ( likes == null) {
                item['likes'] = 0;
              } else {
                item['likes'] = likes;
              }
            },
            error => {
              item['likes'] = 0;
            });
        });

        this.postList.forEach(item => {
          this.server.getPostsReactions(item['post_id'], 'dislike').subscribe(
            data3 => {
              console.log(data3);
              const filteredData = data3['User'][0];
              const dislikes = filteredData['Total_of_dislikes'];
              item['dislikes'] = dislikes;

            },
            error => {
              item['dislikes'] = 0;
            });
        });

        this.postList.forEach(item => {
          this.server.getSingleUser(item.p_created_by).subscribe(
            data4 => {
              console.log(data4['User']);
              const user = data4['User'];
              item['username'] = user['first_name'] + ' ' + user['last_name'];

            },
            error => {
              console.log(error);
              this.notifications.httpError(error);
            }
          );
        });

        console.log(this.postList);



      }
    );

  }

  showPostReactions(post_id: string) {
    console.log('clicked: ' + post_id );
    this.router.navigate(['chatsList/chat/' + this.chat.chat_id + '/reactions/', post_id]);

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

