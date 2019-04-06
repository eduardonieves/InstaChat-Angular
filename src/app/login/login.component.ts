import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RemoteServerService } from './../bussiness-logic/remote-server.service';
import { NotificationService } from './../bussiness-logic/notifications.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
    loading = false;
    returnUrl: string;
    public username: string;
    public password: string;

    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private server: RemoteServerService,
        private notifications: NotificationService,
        public dialog: MatDialog
    ) { }

    // openDialog(): void {
    //     console.log('Before Error');
    //     const dialogRef = this.dialog.open(ResetPasswordComponent, {
    //       width: '300px',
    //       data: {oldPassword: this.oldPassword, newPassword: this.newPassword, confirmNewPassword: this.confirmNewPassword}
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //     });
    //   }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.username = '';
        this.password = '';
    }

    login() {
        this.loading = true;
        this.server.login(this.username, this.password).subscribe(
            res => {
                this.loading = false;
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.loading = false;
                this.password = '';
                this.notifications.httpError(error);
            }
        );
    }

    showRegister() {
        this.router.navigate(['/register']);
    }
}
export interface DialogData {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
