import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import {IClient} from './client.model';

@Injectable({providedIn: 'root'})
export class ClientService {
  private readonly resourceUrl = environment.url + '/api/client';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${this.resourceUrl}/list`);
  }

  findById(id: number): Observable<IClient> {
    return this.http.get<IClient>(`${this.resourceUrl}/${id}`);
  }

  create(client: IClient): Observable<IClient> {
    return this.http.post<IClient>(`${this.resourceUrl}/save`, client);
  }

  update(client: IClient): Observable<IClient> {
    return this.http.put<IClient>(`${this.resourceUrl}/update`, client);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.resourceUrl}/delete/${id}`);
  }
}
