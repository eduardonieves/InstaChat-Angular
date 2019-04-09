import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { map, catchError } from 'rxjs/operators';
// import {
//   ServerMake,
//   DataCenter,
//   ServiceAgreement,
//   Contract,
//   Account,
//   SubAccount,
//   ServerType,
//   ServerSize,
//   ServerOS,
//   Asset
// } from './../models/Asset';
// import { UploadedFiles, ServerFile } from './../models/UploadedFiles';
// import { Response } from './../models/RemoteResponse';
import { User } from './User';
import {Posts} from './Posts';
import {DashboardPost} from '../dashboard/dashboard.component';
import {DashboardHashtag} from '../dashboard/dashboard.component';
import {Chats} from './Chats';

@Injectable()
export class RemoteServerService {
  constructor(private http: HttpClient) { }
  private loggedIn = false;

  private head = new HttpHeaders({
    'Content-type': 'application/json',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,PUT,DELETE',
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, token'
  });

  private getModifiedHeader() {
    return {
      headers: this.head.append('Authorization', localStorage.getItem('token'))
    };
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public getHome(): Observable<Object> {
    return this.http.get(
      'http://localhost:5000/InstaChat/home/',
      this.getModifiedHeader()
    );
  }

  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(
        'http://localhost:5000/InstaChat/users'
        // .pipe(map(data => User.fromList(data['Users'])));
      );
  }

  public getSingleUser(id: string): Observable<User> {
    return this.http
      .get<User>(
        'http://localhost:5000/InstaChat/users/' + id );
  }


  public getUserContacts(id: string): Observable<User[]> {
    return this.http
      .get<User[]>(
        'http://localhost:5000/InstaChat/users/' + id + '/contacts');
  }



  public getDashboardPosts(): Observable<DashboardPost[]> {
    return this.http
      .get<DashboardPost[]>(
        'http://localhost:5000/InstaChat/dashboard/posts'
      );
  }

  public getAllChats(): Observable<Chats[]> {
    return this.http.get<Chats[]>('http://localhost:5000/InstaChat/chats');
  }

  public getChatById(id: string): Observable<Chats> {
    return this.http.get<Chats>('http://localhost:5000/InstaChat/chats/' + id );
  }

  public getChatPosts(id: string): Observable<Posts> {
    return this.http.get<Posts>('http://localhost:5000/InstaChat/chats/' + id + '/posts' );
  }

  public getChatUsers(id: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/InstaChat/chats/' + id + '/users' );
  }

  public getPostsReactions(post_id: string, react_type: string): Observable<Posts> {
    return this.http.get<Posts>('http://localhost:5000/InstaChat/posts/' + post_id + '/reacts/' + react_type );
  }

  public getPostUserReactions(post_id: string, react_type: string): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:5000/InstaChat/users/posts/' + post_id + '/' + react_type );
  }


  public getTrendingHashtags(date: string): Observable<[DashboardHashtag[]]> {
    return this.http
      .get<[DashboardHashtag[]]>(
        'http://localhost:5000/InstaChat/dashboard/' + date + '/hashtags'
      );
  }


  public login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
    return this.http
      .post('http:/localhost:5000/InstaChat/login/', body, { headers: this.head })
      .pipe(
        map(res => {
          this.loggedIn = true;
          localStorage.setItem('email', res['Result']['email']);
          localStorage.setItem('firstName', res['Result']['firstName']);
          localStorage.setItem('lastName', res['Result']['lastName']);
          localStorage.setItem('userId', res['Result']['userId']);
          localStorage.setItem('status', res['Result']['status']);
        })
      );
  }

  public register(
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
  ) {
    const body = {
      email: email,
      password: password,
      username: firstName + '.' + lastName,
      firstName: firstName,
      lastName: lastName
    };
    return this.http
      .post(
        'http:/localhost:5000/InstaChat/register/',
        body,
        this.getModifiedHeader()
      )
      .pipe(
        map(res => {
          this.loggedIn = true;
        })
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }

  public postFile(data: FormData) {
    const params = new HttpParams();

    const options = {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')),
      params: params,
      reportProgress: true,
    };

    return this.http.post(
      '',
      data, options
    );
  }

}
