import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  public role:string ;
  public currentUser: User;
  private userPrincipalSub: Subscription;

  constructor(private userService:UserService) {

  }
  ngOnDestroy(): void {
    this.userPrincipalSub.unsubscribe();
  }

  ngOnInit() {
    this.userPrincipalSub = this.userService.user$.subscribe(user => {
      this.currentUser = user;
      this.role = user.role;
    });
  }

}
