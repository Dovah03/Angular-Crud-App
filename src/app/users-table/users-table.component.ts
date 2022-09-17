import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTablesModule , DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AuthService } from '../login/services/auth.service';
import { ErrorService } from '../login/services/error.service';
import { Client } from '../model/Client';
import { themeService } from '../Services/theme.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit,AfterViewChecked {

  private dtElement: DataTableDirective;
  dtOptions: any = {};
  ClientsList : Client[];
  selectedUser: Client;
  dtTrigger: Subject<any> = new Subject<any>();
  showLoadingSpinner:boolean = false; //show loading while hiding datatable
  showtableheader:boolean = true;
  isDark:boolean;
  selectedClient: Client;
  showtable:Boolean = true;

  constructor(private userService : UserService,
    private errService:ErrorService,
    private Auth:AuthService,
    private router:Router,
    private theme: themeService) { }

  ngOnInit(): void {
    this.isDark = this.theme.getCurrentTheme();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      className: "table-cell-edit",
      language: {
        search: "rechercher:",
        info: "Montrant le _START_ au _END_ de _TOTAL_ éléments en total",
        infoEmpty: "Montrant 0 de 0 éléments en total",
        infoFiltered: " (filtrer de _MAX_ éléments en total)",
        emptyTable: "Aucune donnée disponible dans le tableau",
        lengthMenu: "Afficher _MENU_ éléments",
        loadingRecords: "Chargement...",
        processing: "Traitement...",
        zeroRecords: "Aucun élément correspondant trouvé",
          paginate: {
            first: "Premier",
            last: "Dernier",
            previous: "Précédent",
            next: "Suivant"
    },
      },
    };

    this.getClients();
  }

  public getClients():void {
    this.Auth.isLoggedIn();
    this.showLoadingSpinner = true;
    this.showtableheader = false;
    this.userService.getClients().subscribe(
      (response : Client[])  => {
        this.showLoadingSpinner = false;
        this.showtableheader = true;
        this.ClientsList = response;
        this.dtTrigger.next();
        this.isDark = this.theme.getCurrentTheme();
        this.theme.setCurrentTheme();
      },
      (error ) => {
        this.errService.handleError(error);
        this.showLoadingSpinner = false;
        this.showtableheader = true;
        this.dtTrigger.next();
      },
    );
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getClients();
    });
  }

  onSelect(client:Client):void {
    this.selectedClient = client;
    this.router.navigateByUrl("/Client/"+client.mysqlid)
  }

  changeView(){
    if(this.showtable === true){
      this.showtable = false;
    }
    else {this.showtable = true;
      this.rerender()
    }
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
