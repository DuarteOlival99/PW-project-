import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductService} from './product.service';
import {IProduct, Product} from './product.model';

@Injectable({providedIn: 'root'})
export class ProductResolver implements Resolve<IProduct> {
  constructor(private service: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.findById(id).pipe(map(product => product));
    }
    return of(new Product());
  }
}
