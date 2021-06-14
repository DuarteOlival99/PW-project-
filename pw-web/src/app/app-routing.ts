import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './layouts/home';
import {LoginComponent} from './layouts/login';
import {ProductFormComponent, ProductListComponent, ProductResolver} from './layouts/product';
import {ClientFormComponent, ClientListComponent, ClientResolver} from './layouts/client';
import {AuthGuard} from './shared/guards';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

const productRoutes: Routes = [
  {
    path: 'product/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      product: ProductResolver,
    },
  },
  {
    path: 'product/:id/edit',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      product: ProductResolver,
    },
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    canActivate: [AuthGuard],
  },
];

const clientRoutes: Routes = [
  {
    path: 'client/new',
    component: ClientFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      client: ClientResolver,
    },
  },
  {
    path: 'client/:id/edit',
    component: ClientFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      client: ClientResolver,
    },
  },
  {
    path: 'client-list',
    component: ClientListComponent,
    canActivate: [AuthGuard],
  },
];

const otherRoutes: Routes = [
  // otherwise redirect to home - THIS MUST BE THE LAST IMPORT
  {path: '**', redirectTo: ''},
];

const ENTITY_STATES = [...routes, ...productRoutes, ...clientRoutes];

@NgModule({
  imports: [RouterModule.forRoot(ENTITY_STATES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
