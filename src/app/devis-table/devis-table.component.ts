import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../login/services/auth.service';
import { DevisService } from '../login/services/devis.service';
import { ErrorService } from '../login/services/error.service';
import { Devis } from '../model/devis';
import { themeService } from '../Services/theme.service';

@Component({
  selector: 'app-devis-table',
  templateUrl: './devis-table.component.html',
  styleUrls: ['./devis-table.component.css']
})
export class DevisTableComponent implements OnInit,AfterViewChecked {

  @ViewChild(DataTableDirective, {static: false})
  private dtElement: DataTableDirective;
  dtOptions: any = {};
  devis : Devis[];
  subscription : Subscription;
  showtable:boolean = true;
  selectedDevis: Devis;
  dtTrigger: Subject<any> = new Subject<any>();
  showLoadingSpinner:boolean = false; //show loading while hiding datatable
  showtableheader:boolean = true;
  currenttheme:boolean = true;
  isDark:boolean;

  constructor(private devisService:DevisService,private toastr: ToastrService, private errService:ErrorService,private Auth:AuthService,private router:Router,private theme: themeService) { }

  ngOnInit(): void {
    this.theme.setCurrentTheme();
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

    this.getDevis();
  }

  public getDevis():void {
    this.Auth.isLoggedIn();
    this.showLoadingSpinner = true;
    this.showtableheader = false;
    this.subscription = this.devisService.getDevis().subscribe(
      (response : Devis[])  => {
        this.showLoadingSpinner = false;
        this.showtableheader = true;
        this.devis = response;
        console.log(response);
        this.dtTrigger.next();
        this.isDark = this.theme.getCurrentTheme();

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
      this.getDevis();
    });
  }
  public onOpenModal(devis:Devis, mode:string): void{
    const container = document.getElementById('main-content');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'add') {
      button.setAttribute('data-bs-target','#addUserModal');
    }
    if(mode === 'delete') {
     // this.deleteUser = user;
      button.setAttribute('data-bs-target','#deleteUserModal');
    }
    container.appendChild(button);
    button.click();
  }

  changeView(){
    if(this.showtable === true){
      this.showtable = false;
    }
    else {this.showtable = true;
      this.rerender()
    }
  }

  public onAddDevis(addForm: NgForm): void {
    document.getElementById('annuler-add').click();
    this.showLoadingSpinner = true;
    console.log(addForm.value)
    this.devisService.addDevis(addForm.value).subscribe(
      (response: Devis)  => {
        this.showLoadingSpinner = false;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Devis d\'ID '+response.numOffre+' crée avec succées','Devis ajouter', {
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
        if(error.status == 400){
          this.showLoadingSpinner = false;
          this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Num Offre dupliqué ','erreur durant l\'ajout de l\'utilisateur ',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-alert alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        }
        else{
          this.showLoadingSpinner = false;
          this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> erreur durant l\'ajout de l\'utilisateur , check log','erreur',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-alert alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        }
        console.error(error);
        addForm.reset();
      }
    );
  }
  onSelect(devis:Devis):void {
    this.selectedDevis = devis;
    this.router.navigateByUrl("/devis-table/"+devis.numOffre)
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


