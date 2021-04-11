import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from '../login/services/auth.service';
import { ErrorService } from '../login/services/error.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit,OnDestroy {
  @ViewChild(DataTableDirective, {static: false})
  private dtElement: DataTableDirective;
  dtOptions: any = {};
  users : User[];
  dtTrigger: Subject<any> = new Subject<any>();
  private userid:number;
  editedUser:User;
  deleteUser:User;
  deactivateUser:User;
  activateUser:User;
  private userPrincipale:User;
  role:string ;
  private UserPrincipal$: Subscription;
  UserList$: Subscription;

  showLoadingSpinner:boolean = false; //show loading while hiding datatable
  showtableheader:boolean = true;

  constructor(private userService:UserService, private toastr: ToastrService, private http: HttpClient, private Auth:AuthService, private errService: ErrorService) { }

  ngOnInit() {

    this.UserPrincipal$ = this.userService.user$.subscribe( user => {
      this.userPrincipale = user;
      this.role = user.role;
    });
    if (this.role === "ROLE_ADMIN")
    {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      language: {
        search: "rechercher:",
        info: "Montrant le _START_ au _END_ de _TOTAL_ éléments en total",
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

    this.getUser();
    }


  }

  public getUser():void {
    this.Auth.isLoggedIn();
    this.showLoadingSpinner = true;
    this.showtableheader = false;
    this.userService.getUsers().subscribe(
      (response : User[])  => {
        this.users = response;
        this.showLoadingSpinner = false;
        this.showtableheader = true;
        this.dtTrigger.next();
      },
      (error ) => {
        this.errService.handleError(error);
        this.showLoadingSpinner = false;
        this.showtableheader = true;
        this.dtTrigger.next();
      },
    );
  }

//why subscription doesnt work update:works but panigation resets after ng on destroy
/*
  public getUser():void {
    this.UserList$ = this.userService.users$.subscribe(
      (response : User[])  => {
        this.users = response;
        this.dtTrigger.next();
      },

    );
  }
*/
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.getUser();
    });
  }
  public onAddUser(addForm: NgForm): void {
    document.getElementById('annuler-add').click();
    this.showLoadingSpinner = true;
    this.userService.addUser(addForm.value).subscribe(
      (response: User)  => {
        this.showLoadingSpinner = false;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> utilisateur de nom '+response.firstName+' crée avec succées','utilisateur ajouter', {
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        addForm.reset();
        this.rerender();
      },
      (error: HttpErrorResponse) => {
        this.showLoadingSpinner = false;
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> erreur durant l\'ajout de l\'utilisateur , check log','erreur',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-alert alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.error(error);
        addForm.reset();
      }
    );
  }
  public onEditUser(user: User): void {
    //document.getElementById('submit-edit').setAttribute("disabled","disabled");
    document.getElementById('annuler-edit').click();
    this.showLoadingSpinner = true;
    this.userid = user.id;
    this.userService.UpdateUserImpl(this.userid,user).subscribe(
      (response: User)  => {
        this.showLoadingSpinner = false;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> utilisateur de nom '+response.firstName+' modifié avec succées','utilisateur modifier' ,{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        this.rerender();
      },
      (error: HttpErrorResponse) => {
        this.showLoadingSpinner = false;
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>erreur durant la modification de l\'utilisateur , check log','erreur',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-alert alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.error(error);

      }
    );
  }

  public onDeactivateUser(user: User): void {
    document.getElementById('annuler-deactivate').click();
    this.showLoadingSpinner = true;
    this.userid = user.id;
    this.userService.deactivateUser(this.userid,user).subscribe(
      (response: void)  => {
        this.showLoadingSpinner = false;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Compte désactivé avec succées','utilisateur désactiver',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        this.rerender();
      },
      (error: HttpErrorResponse) => {
        this.showLoadingSpinner = false;
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>erreur durant la désactivation du compte , check log','erreur',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-alert alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.error(error);

      }
    );
  }

  public onActivateUser(user: User): void {
    document.getElementById('annuler-activate').click();
    this.showLoadingSpinner = true
    this.userid = user.id;
    this.userService.activateUser(this.userid,user).subscribe(
      (response: void)  => {
        this.showLoadingSpinner = false;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Compte activé avec succées','utilisateur activé',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        this.rerender();
      },
      (error: HttpErrorResponse) => {
        this.showLoadingSpinner = false;
        this.toastr.error("erreur durant l'activation du compte , check log",'erreur')
        console.error(error);

      }
    );
  }

  public onDeleteUser(userid: number): void {
    document.getElementById('annuler-delete').click();
    this.showLoadingSpinner = true ;
    this.userService.deleteUser(userid).subscribe(
      (response: void)  => {
        this.showLoadingSpinner = false ;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>utilisateur Supprimer avec succées','utilisateur Supprimer',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        this.rerender();
      },
      (error: HttpErrorResponse) => {
        this.showLoadingSpinner = false;
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>erreur durant la suppression de l\'utilisateur , check log','erreur',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-alert alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.error(error);

      }
    );
  }

  public onOpenModal(user:User, mode:string): void{
    const container = document.getElementById('main-content');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target','#addUserModal');
    }
    if(mode === 'edit') {
      this.editedUser = user;
      button.setAttribute('data-bs-target','#editUserModal');
    }
    if(mode === 'deactivate') {
      this.deactivateUser = user;
      button.setAttribute('data-bs-target','#deactivateUserModal');
    }
    if(mode === 'activate') {
      this.activateUser = user;
      button.setAttribute('data-bs-target','#activateUserModal');
    }
    if(mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-bs-target','#deleteUserModal');
    }
    container.appendChild(button);
    button.click();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.UserPrincipal$.unsubscribe();
  }
}
