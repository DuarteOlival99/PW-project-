import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';

import {User} from '../models';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public jwtToken: string;

  private readonly resourceUrl = environment.url + '/api';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get getJwtToken(): string {
    return this.jwtToken;
  }

  public set setJwtToken(token: string) {
    this.jwtToken = token;
  }

  fetch(): Observable<User> {
    return this.http.get<User>(`${this.resourceUrl}/account`);
  }

  login(username: string, password: string) {
    let me = this;
    return this.http.post<any>(`${this.resourceUrl}/authenticate`, {username, password}).pipe(
      map(token => {
        // login successful if there's a jwt token in the response
        if (token && token.id_token) {
          localStorage.setItem('jwtToken', JSON.stringify(token.id_token));
          return this.identify();
        } else {
          return unauthorised();
        }

        function unauthorised() {
          return throwError({status: 401, error: {message: 'Unauthorised'}});
        }
      })
    );
  }

  identify() {
    return this.fetch().pipe(
      map(dbUser => {
        const user = dbUser;
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
