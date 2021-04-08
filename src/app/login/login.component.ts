import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorService } from './services/error.service';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../assets/css/bootstrap.min.css',
  '../../assets/css/now-ui-kit.css',
  '../../assets/css/now-ui-kit.min.css',
]
})
export class LoginComponent implements OnInit {
  user: any={};
  loginForm!: FormGroup;
  UserPrincipal : User;
  private LoginSub: Subscription;
  error: HttpErrorResponse;
  showLoadingSpinner : boolean = false;

  constructor(private router:Router, private userService:UserService, private fb: FormBuilder, private toastr:ToastrService, private Error:ErrorService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'username' : [null,Validators.required],
      'password' : [null, Validators.required]
    });
  }



  login(): void {
    const val = this.loginForm.value;
    if(val.username === null || val.password === null || val.username === "" || val.password === ""){
      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> veuillez remplir les champs vides', 'erreur: Champs vides', {
        timeOut: 8000,
        enableHtml: true,
        toastClass: "alert alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'right'
        })
    }
    else {
      this.showLoadingSpinner = true;
      this.LoginSub = this.userService.loginImpl(val.username,val.password).subscribe(
      res => {
        this.showLoadingSpinner = false;
        //this.user = res;
        this.userService.islogged=true;//define function setislogged(bool)
        this.UserPrincipal = res;
        console.log(this.UserPrincipal);
        //localStorage.setItem('currentUser', JSON.stringify(Jwt));
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Bienvenue '+ this.UserPrincipal.firstName +' '+ this.UserPrincipal.lastName, 'Bienvenue', {
          timeOut: 8000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        this.router.navigate(['/dashboard'])
          },
          error => {
            if(error.status === 401){
              this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> veuillez vous assurer des données Enter','Login ou Mot de passe incorrecte', {
                timeOut: 8000,
                enableHtml: true,
                toastClass: "alert alert-with-icon",
                positionClass: 'toast-' + 'top' + '-' +  'right'
                })
                this.showLoadingSpinner = false
            }
            else {this.Error.handleError(error);
              this.showLoadingSpinner = false;
            }
            }

          );
        }
  }
  ngOnDestroy(): void {
    this.LoginSub.unsubscribe();

  }

}


