import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './login/services/auth.service';
import { ErrorService } from './login/services/error.service';
import { themeService } from './Services/theme.service';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy{
  title = 'Angular-Crud-App-Demo';
  private users!: User[];
  private loggedinUser!: User;
  private currentUserSub:Subscription;
  constructor(private userService: UserService,private router:Router,private Auth:AuthService, private err: ErrorService, private theme:themeService){}


  ngOnInit() {
    this.Auth.isLoggedIn().subscribe(
      (loggedin => console.log(loggedin))
  );
    if(!!localStorage.getItem('JWT')){
    this.currentUserSub = this.userService.getCurrentUser().subscribe(
      currentuser  => {
        this.userService.setCurrentUser(currentuser);
        this.userService.islogged = true;
        console.log(this.userService.islogged);
      },
      (error : HttpErrorResponse) => {
        this.err.handleError(error);
        console.log(error)
      }
    );
  }
    else this.router.navigate(['/login'])
  }
  ngOnDestroy(): void {
   this.userService.unsubFromBSubject();
   this.currentUserSub.unsubscribe();
  }
}
