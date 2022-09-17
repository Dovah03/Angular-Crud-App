import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { BC } from '../../model/BC';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../login/services/auth.service';
import { ErrorService } from '../../login/services/error.service';
import { Client } from '../../model/Client';
import { themeService } from '../../Services/theme.service';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { BCService } from '../../Services/BC.service';

@Component({
  selector: 'app-client-bc',
  templateUrl: './client-bc.component.html',
  styleUrls: ['./client-bc.component.css']
})
export class ClientBcComponent implements OnInit,AfterViewChecked {

  BC: BC[] =[];
  client : Client;
  id:number;
  showLoadingSpinner:boolean = false; //show loading while hiding datatable
  currenttheme:boolean = true;
  isDark:boolean;

  constructor(private bcService:BCService,private userService: UserService,private toastr: ToastrService, private errService:ErrorService,private Auth:AuthService,private router:Router,private theme: themeService) { }

  ngOnInit(): void {
    this.showLoadingSpinner=true;
    this.userService.getCurrentUser().subscribe((response:User) =>{
      this.id = response.id
      this.userService.getClientbyId(this.id).subscribe((res : Client) => {
        this.client = res;
        console.log(this.client);
        var ctr = 0;
        var length = res.bcid_list.length;
        console.log(length)
        if(length != 0){
        res.bcid_list.forEach((n : number) => {console.log(n); this.bcService.getBcById(n).subscribe((res : BC) => {
          this.BC.push(res);
          ctr ++;
          if(ctr === length){this.showLoadingSpinner=false;}
          console.log(this.BC);
        },
          (error ) => {
            this.errService.handleError(error);
          }
      )})
        }
        else
        {
            this.showLoadingSpinner = false;
              this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Aucun Bon de Commande à afficher ','Pas de B.C Affecté',{
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
