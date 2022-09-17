import { Component, OnInit } from '@angular/core';
import { BL } from '../../model/BL';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../login/services/auth.service';
import { ErrorService } from '../../login/services/error.service';
import { Client } from '../../model/Client';
import { themeService } from '../../Services/theme.service';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { BLService } from '../../Services/BL.service';

@Component({
  selector: 'app-client-bl',
  templateUrl: './client-bl.component.html',
  styleUrls: ['./client-bl.component.css']
})
export class ClientBlComponent implements OnInit {

  BL: BL[] =[];
  client : Client;
  id:number;
  showLoadingSpinner:boolean = false; //show loading while hiding datatable
  showtableheader:boolean = true;
  currenttheme:boolean = true;
  isDark:boolean;

  constructor(private blService:BLService,private userService: UserService,private toastr: ToastrService, private errService:ErrorService,private Auth:AuthService,private router:Router,private theme: themeService) { }

  ngOnInit(): void {
    this.showLoadingSpinner=true;
    this.userService.getCurrentUser().subscribe((response:User) =>{
      this.id = response.id
      this.userService.getClientbyId(this.id).subscribe((res : Client) => {
        this.client = res;
        var ctr = 0;
        var length = res.blid_list.length
        console.log(this.client);

        if(length != 0){
          res.blid_list.forEach((n : number) => {console.log(n); this.blService.getBlById(n).subscribe((res : BL) => {
            this.BL.push(res);
            ctr ++;
            if(ctr === length){this.showLoadingSpinner=false;}
            console.log(this.BL);
          },
            (error ) => {
              this.errService.handleError(error);
            }
        )})
          }
          else
          {
              this.showLoadingSpinner = false;
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Aucun Bon de Livraison à afficher ','Pas de B.L Affecté',{
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

