import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import { NotificationService } from './../bussiness-logic/notifications.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public username = localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName');
    public serverCount = 0;
    public serverDeletes = 0;
    public serverAdds = 0;
    constructor(
        private router: Router,
        private server: RemoteServerService,
        private notifications: NotificationService
    ) { }

    ngOnInit() {
       // console.log(localStorage.getItem('token'));
        this.server.getHome().subscribe(
            res => {

                const stats = res['Statistics'];
                console.log(stats['latestReports']);
                this.serverCount = stats['serverCount'];
                this.serverAdds = stats['serverAdds'];
                this.serverDeletes = stats['serverDeletes'];

                // .latestReports.map(item => {
                    // const types: string[] = [];
                    // item.type.map(element => {
                    //     console.log(element);
                    //     types.push(element);
                    // });
                    // return new Report(
                    //     item.download_url,
                    //     item.filename,
                    //     item.filepath,
                    //     item.timestamp,
                    // );
               // });
            },
            error => {
                console.log(error);
                if (error.status === 403) {
                  this.router.navigate(['login']);
                }
                this.notifications.error('Timed Out');
              }
            );
    }

    applyGray(index: number): boolean {
        console.log('applied');
        return index % 2 !== 0;
    }

    logout() {
        this.router.navigate(['login']);
    }



}
