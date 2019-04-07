import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { RemoteServerService } from './remote-server.service';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private remoteService: RemoteServerService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true;
    // if (this.remoteService.isLoggedIn() || localStorage.getItem('token')) {
    //   return true;
    // }
    // this.router.navigate(['login']);
    // return false;
  }
}
