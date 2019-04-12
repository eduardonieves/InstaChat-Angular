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

export class DashboardHashtag {
  constructor(
    public hash_name: string,
    public hashtag_id: number,
    public position: number

  ) { }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataSource = new DashboardPostDataSource(this.server);
  hashtagSource: DashboardHashtagDataSource;

  endedFetch = false;
  hashtagsResults: any[];
 // public hashtagList =  Array<DashboardHashtag>();
  public hashtagList =  Array<DashboardHashtagDataSource>();

  hashtagsColumns = ['hash_name', 'position'];
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

          this.server.getTrendingHashtags(item['post_date']).subscribe(
            data2 => {
              // console.log(data2);
              this.hashtagsResults = data2['Hashtag'];
              this.hashtagsResults.forEach(item2 => {
                console.log(item2);
                this.hashtagList.push(item2);
              });

              this.endedFetch = true;
              console.log(this.hashtagList);
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

export class DashboardHashtagDataSource extends DataSource<any> {
  constructor(private dashboardService: RemoteServerService) {
    super();
  }
  connect(): Observable<DashboardHashtag[]> {
    const data = this.dashboardService.getTrendingHashtags('');
    return data;
  }
  disconnect() {}
}
