import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorService } from '../login/services/error.service';
import { themeService } from '../Services/theme.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnDestroy {

  user : User;
  url = "";
  userPrincipal : User
  userId: number
  editable:boolean
  message: any;
  pswForm!:FormGroup;
  OnInitSub$: Subscription;
  ChangePasswordSub: Subscription;
  UpdateUserSub: Subscription;
  showLoadingSpinner: boolean = false;

  constructor( private userService: UserService, private fb: FormBuilder, private toastr: ToastrService , private errorService:ErrorService, private theme:themeService) {
  }

  ngOnInit() {
    this.theme.setCurrentTheme();
    this.OnInitSub$ =  this.userService.user$.subscribe(user => {
    this.userPrincipal = user;
    console.log(this.userPrincipal);
    this.userId = user.id;
  })

    this.pswForm = this.fb.group({
      'currentPsw' : [null,Validators.required],
      'newPassword' : [null, Validators.required],
      'rePassword' : [null, Validators.required]
    });
   // this.userId = Number.parseInt(localStorage.getItem('ID'));
   // this.userService.getUserbyId(this.userId).subscribe((userP: User)  =>  this.userPrincipal = userP);
    //this.userPrincipal = localStorage.getItem('user');
    //this.userService.userprincipal.subscribe(userP  =>  this.userPrincipal = userP)

  }

  public onChangePassword():void{
    const val = this.pswForm.value;
    console.log(val.currentPsw +  val.newPassword);

    if(val.currentPsw === null || val.newPassword === null || val.rePassword === null
     || val.currentPsw === "" || val.newPassword === "" || val.rePassword === ""){
      this.toastr.error('veuillez remplir les champs vides','erreur: Champs vides')
    }
    else if(!(val.newPassword === val.rePassword)){
      this.toastr.error('Les Mot de passe ne sont pas identiques','erreur:')
      }
    else {
      document.getElementById('annuler-psw').click();
      //document.getElementById('submit-psw').setAttribute("disabled","disabled");
      this.showLoadingSpinner = true;
      this.ChangePasswordSub = this.userService.changePswImpl(val.currentPsw,val.newPassword).subscribe(
      () => {
        //this.userPrincipal = res;
        this.showLoadingSpinner= false;
        console.log(this.userPrincipal);
        this.toastr.success('Mot de Passe mis-à-jour avec succées','Mot de passe Modifié:')
        //document.getElementById('annuler-psw').click();
        //document.getElementById('submit-psw').removeAttribute("disabled");
        this.pswForm.reset();
      },
  (error: HttpErrorResponse) => {
    this.showLoadingSpinner= false;
    this.toastr.error("Mot de passe Erroné , check log",'erreur')
    console.error(error);
    //document.getElementById('submit-psw').removeAttribute("disabled");
    this.pswForm.reset();
  }
);
}}
  public onEditUser(user: User): void {
    document.getElementById('annuler-Edit').click();
    //document.getElementById('submit-Edit').setAttribute("disabled","disabled");
    this.showLoadingSpinner = true;
    this.UpdateUserSub = this.userService.UpdateUserProfile(this.userId,user).subscribe(
      (response: User)  => {
        this.showLoadingSpinner= false;
        this.userPrincipal = response;
        this.toastr.success('utilisateur de nom '+response.firstName+' modifié avec succées','utilisateur modifier')
        console.log(response);
        //document.getElementById('annuler-Edit').click();
        //document.getElementById('submit-Edit').removeAttribute("disabled");

      },
      (error: HttpErrorResponse) => {
        this.showLoadingSpinner = false;
        this.errorService.handleError(error);

       // if(error.status === 401){
       //   this.toastr.error("Votre Session a expiré veuillez vous reconnectez !")
       //   this.router
       // }

      }
    );
  }

  selectFile(event){
    if(event.target.files){
      if(event.target.files[0].type.match(/image\/*/)==null){this.message="veuillez selectionner un fichier Image"; return}
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
     // console.log(event);
     // console.log(event.target.files[0]);
     // console.log(event.target.files[0].name);

      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(event.target.result);

        const image = document.getElementById('profilePic');
        this.userPrincipal.profileImageUrl = this.url;
        image.setAttribute('src', this.url);
      }
    }
  }


  public onOpenModal(user:User,mode:string): void{
    const container = document.getElementById('main-content');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === "profile"){
      button.setAttribute('data-bs-target','#editProfileModal');
      }
      if(mode === "password"){
        button.setAttribute('data-bs-target','#editPasswordModal');
        }
      container.appendChild(button);
      button.click();

    }
    ngOnDestroy(): void {
      this.OnInitSub$.unsubscribe();
      if(this.UpdateUserSub !== undefined)
      this.UpdateUserSub.unsubscribe();
      if(this.ChangePasswordSub !== undefined)
      this.ChangePasswordSub.unsubscribe();
    }
}
