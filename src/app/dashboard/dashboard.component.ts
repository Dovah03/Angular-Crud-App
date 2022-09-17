import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { themeService } from '../Services/theme.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {
  public role:string ;
  public currentUser: User;
  private userPrincipalSub: Subscription;
  public show:boolean = true; //to maintain table-devis color without flickering to black
  constructor(private userService:UserService,private theme:themeService) {


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
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.theme.setCurrentTheme();

  }
}
