import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterLink } from '@angular/router';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    location: string;

    constructor(private router: Router) {
        this.location = 'home';
        router.events.filter(event => event instanceof NavigationEnd).subscribe(res => {
            const end = res as NavigationEnd;
            this.location = end.url.split('/').pop();
        });
    }

}
