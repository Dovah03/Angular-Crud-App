import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../login/services/auth.service';
import { DevisService } from '../../login/services/devis.service';
import { ErrorService } from '../../login/services/error.service';
import { Client } from '../../model/Client';
import { Devis } from '../../model/devis';
import { themeService } from '../../Services/theme.service';
import { User } from '../../user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-client-devis',
  templateUrl: './client-devis.component.html',
  styleUrls: ['./client-devis.component.css']
})
export class ClientDevisComponent implements OnInit,AfterViewChecked {

  Devis: Devis[] =[];
  client : Client;
  id:number;
  showLoadingSpinner:boolean = false; //show loading while hiding datatable
  currenttheme:boolean = true;
  isDark:boolean;

  constructor(private devisService:DevisService,private userService: UserService,private toastr: ToastrService, private errService:ErrorService,private Auth:AuthService,private router:Router,private theme: themeService) { }

  ngOnInit(): void {
    this.showLoadingSpinner=true;
    this.userService.getCurrentUser().subscribe((response:User) =>{
      this.id = response.id
      this.userService.getClientbyId(this.id).subscribe((res : Client) => {
        this.client = res;
        console.log(this.client);
        var ctr = 0;
        var length = res.devisID_list.length
        if(length != 0){
          res.devisID_list.forEach((n : number) => {console.log(n); this.devisService.getDevisById(n).subscribe((res : Devis) => {
            this.Devis.push(res);
            ctr ++;
            if(ctr === length){this.showLoadingSpinner=false;}
            console.log(this.Devis);
          },
            (error ) => {
              this.errService.handleError(error);
            }
        )})
          }
          else
          {
              this.showLoadingSpinner = false;
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Aucun Devis à afficher ','Pas de Devis Affecté',{
                  timeOut: 2000,
                  enableHtml: true,
                  toastClass: "alert alert-alert alert-with-icon",
                  positionClass: 'toast-' + 'top' + '-' +  'right'
                  });
          }
      },
      (error ) => {
        this.errService.handleError(error);
      }
     )})
    }

  applyTheme(){
    this.theme.setCurrentTheme();
    this.isDark = this.theme.getCurrentTheme();
  }


  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.applyTheme()
  }
}
