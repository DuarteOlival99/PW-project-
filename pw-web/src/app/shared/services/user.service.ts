import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

import {User} from './../models';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly resourceUrl = environment.url + '/api/client';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${this.resourceUrl}/list`);
  }
}
