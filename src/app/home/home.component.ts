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
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    constructor(
        private router: Router,
        private server: RemoteServerService,
        private notifications: NotificationService
    ) { }

    ngOnInit() {
       // console.log(localStorage.getItem('token'))
    }

    applyGray(index: number): boolean {
        console.log('applied');
        return index % 2 !== 0;
    }

    logout() {
        this.router.navigate(['login']);
    }



}
