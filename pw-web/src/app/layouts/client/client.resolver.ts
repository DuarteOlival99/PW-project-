import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ClientService} from './client.service';
import {IClient, Client} from './client.model';

@Injectable({providedIn: 'root'})
export class ClientResolver implements Resolve<IClient> {
  constructor(private service: ClientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClient> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.findById(id).pipe(map(client => client));
    }
    return of(new Client());
  }
}
