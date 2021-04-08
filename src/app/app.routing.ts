import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/services/auth.guard';
import { AuthService } from './login/services/auth.service';

const routes: Routes =[
  {
    path: '',
    canActivate:[AuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [
        {
      path: '',
      canActivate:[AuthGuard],
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
    canActivate:[AuthGuard],
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers:[
    AuthService,
    AuthGuard
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
