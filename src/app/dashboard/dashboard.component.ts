import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import {DataSource} from '@angular/cdk/collections';
import { NotificationService } from './../bussiness-logic/notifications.service';
import { User } from './../bussiness-logic/User';
import { Observable } from 'rxjs/Observable';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';


export interface DashboardPost {
  post_date: string;
  post_count: number;
}

export interface DashboardHashtag {
  hashtag_id: number;
  hash_name: string;
  position: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataSource = new DashboardPostDataSource(this.server);
  displayedColumns = ['date', 'posts'];
  results: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private server: RemoteServerService,
    private notifications: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.server.getDashboardPosts().subscribe(
      data => {


         this.dataSource = data['Post'];
       // console.log(this.dataSource);

        this.results = data['Post'];
         console.log(this.results);
        this.results.forEach(item => {
          // const subString = item['post_date'].split('/').join('');
          // // subString.replace('/','');
          // console.log(subString);

          this.server.getTrendingHashtags(item['post_date']).subscribe(
            data2 => {
              console.log(data2);
            });
          // until here
        });

      },
      error => {
        console.log(error);
        this.notifications.httpError(error);
      }
    );
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
export class DashboardPostDataSource extends DataSource<any> {
  constructor(private dashboardService: RemoteServerService) {
    super();
  }
  connect(): Observable<DashboardPost[]> {
    return this.dashboardService.getDashboardPosts();
  }
  disconnect() {}
}
