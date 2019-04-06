import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { NotificationService } from './bussiness-logic/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  private notificationObserver;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private snackbar: MatSnackBar,
    private notifications: NotificationService
  ) { }

  ngOnInit() {
    this.router
      .events
      .filter(event => event instanceof NavigationEnd)
      .map(() => {
        let child = this.activatedRoute.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      }).subscribe((title: any) => {
      this.titleService.setTitle(title);
    });

    this.notificationObserver = this.notifications.currentAlert.subscribe( alert => {
      if ( alert != null ) {
        this.snackbar.open(alert.message, 'Dismiss', {
          duration: 3000
        });
        this.notifications.clearAlert();
      }
    });
  }

  ngOnDestroy() {
    this.notificationObserver.unsubscribe();
  }

}
