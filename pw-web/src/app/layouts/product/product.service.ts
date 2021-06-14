import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import {IProduct} from './product.model';

@Injectable({providedIn: 'root'})
export class ProductService {
  private readonly resourceUrl = environment.url + '/api/product';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}/list`);
  }

  findById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.resourceUrl}/${id}`);
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.resourceUrl}/save`, product);
  }

  update(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.resourceUrl}/update`, product);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.resourceUrl}/delete/${id}`);
  }
}
