import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DevisService } from '../login/services/devis.service';
import { ErrorService } from '../login/services/error.service';
import { Devis } from '../model/devis';
import { mail } from '../model/mail';
import { ExportExcelService } from '../Services/export-excel.service';
import { MailService } from '../Services/mail.service';
import { themeService } from '../Services/theme.service';
import * as logo from "../Services/myLogo.js";
import { UserService } from '../user.service';


@Component({
  selector: 'app-devis-details',
  templateUrl: './devis-details.component.html',
  styleUrls: ['./devis-details.component.css']
})
export class DevisDetailsComponent implements OnInit,AfterViewChecked {

  @Input() devis : Devis;
  public showLoadingSpinner:boolean = true;
  private id : number;
  dataForExcel = [];
  EmailForm: FormGroup;
  MailSub: Subscription;
  filestatus = {status: '', requestType: '', percent: 0};
  filenames: String[] = [];
  Email:mail;
  isDark: boolean;
  userPrincipalSub: Subscription;
  role:string;


  constructor(private userService:UserService,private route:ActivatedRoute, private router:Router, private devisService:DevisService,
    private toastr: ToastrService, public ete: ExportExcelService, private theme:themeService,
    private fb:FormBuilder, private Error: ErrorService, private mail:MailService) {}

  ngOnInit(): void {
    this.userPrincipalSub = this.userService.user$.subscribe(user => {
      this.role = user.role;
    });
    this.EmailForm = this.fb.group({
      'to' : [null,Validators.required],
      'subject' : [null, Validators.required],
      'text' : [null, Validators.required],
      'filenames' : [this.filenames, Validators.required]
    });
    this.theme.setCurrentTheme();

    this.id =+ this.route.snapshot.params['id'];
    this.devisService.getDevisById(this.id).subscribe((response : Devis)  => {
      this.devis = response;
      this.showLoadingSpinner = false;
      this.dataForExcel.push(this.devis);
      console.log(this.dataForExcel)
    })
  };
  public onOpenModal(mode:string): void{
    const container = document.getElementById('main-content');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'edit') {
      button.setAttribute('data-bs-target','#editDevisModal');
    }
    if(mode === 'delete') {
      button.setAttribute('data-bs-target','#deleteDevisModal');
    }
    if(mode === 'mail') {
      button.setAttribute('data-bs-target','#sendMailModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onEdit(devis:Devis): void {
    //document.getElementById('submit-edit').setAttribute("disabled","disabled");
    document.getElementById('annuler-edit').click();
    this.showLoadingSpinner = true;
    this.devisService.updateDevis(this.id,devis).subscribe(
      (response: Devis)  => {
        this.showLoadingSpinner = false;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Devis de num D\'offre '+response.numOffre+' modifié avec succès','utilisateur modifier' ,{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);

          this.router.navigate(['/devis-table/']);

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

      }
    );
  }
  public onDelete(): void {
    document.getElementById('annuler-delete').click();
    this.showLoadingSpinner = true ;
    this.devisService.deleteDevis(this.id).subscribe(
      (response: Devis)  => {
        this.showLoadingSpinner = false ;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Devis supprimé avec succès','Devis Supprimé',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        this.router.navigateByUrl("/devis-table")
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
  exportToExcel() {
    let reportData = {
      title: 'Devis_Isoqualtech',
      devis: this.dataForExcel[0]

    }

    this.ete.excelDevisExport(reportData);
  }

  exportToPDF(){
    let date = new Date;
    let month  = date.getMonth()+1;
    let doc = new jsPDF();
    let ImageDate = logo.logoImage;
    doc.setDrawColor(66,150,50);
    doc.rect(10, 10, 190, 280)

    //rec ref
    doc.setDrawColor(40,218,163);
    doc.setFillColor(255, 0, 0)
    doc.rect(31,164, 27, 8)

    //rec qté
    doc.setDrawColor(40,218,163);
    doc.setFillColor(255, 0, 0)
    doc.rect(31, 184, 24, 8)

    //rec Puht
    doc.setDrawColor(40,218,163);
    doc.setFillColor(255, 0, 0)
    doc.rect(31, 204, 34, 8)

    //rec Mt
    doc.setDrawColor(40,218,163);
    doc.setFillColor(255, 0, 0)
    doc.rect(31, 224, 38, 8)

    //rec Desc
    doc.setDrawColor(40,218,163);
    doc.setFillColor(255, 0, 0)
    doc.rect(31, 244, 30, 8)

    doc.addImage(ImageDate,'JPEG',20,10,120,40)
    doc.setFont('helvetica','Bold')
    doc.text( 'Details du Devis de Numero : '+ this.devis.numOffre,68,100);
    doc.text("Issue à la date : "+this.devis.date,57,110);
    doc.setFont('Bold');
    doc.text('Référence                                   :                                   '+this.devis.num_Article,33,170)
    doc.text('Quantité                                     :                                    '+this.devis.qty,33,190)
    doc.text('Prix Unitaire                              :                          '+this.devis.p_U_HT+' DH H.T',33,210)
    doc.text('Montant Total                            :                            '+this.devis.p_T_HT+' DH H.T',33,230)
    doc.text('Déscription                                :                        '+this.devis.description,33,250)

    doc.save('ISOQUALTECH_Devis.pdf');
}

  SendMail(){
    const val = this.EmailForm.value;
    console.log(val);
    if(val.to === null || val.subject === null || val.to === "" || val.subject === ""){
      this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> veuillez remplir les champs vides', 'erreur: Champs vides', {
        timeOut: 8000,
        enableHtml: true,
        toastClass: "alert alert-with-icon",
        positionClass: 'toast-' + 'top' + '-' +  'right'
        })
      }
        else {
          document.getElementById('annuler-mail').click();
          this.showLoadingSpinner = true;
          this.Email = this.EmailForm.value;
          console.log("this is mail : ",this.Email)
          this.MailSub = this.mail.Mail(this.Email).subscribe(
          res => {
            this.showLoadingSpinner = false;
            console.log(res);
            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Email envoyé avec succés', 'Email envoyer', {
              timeOut: 8000,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' +  'right'
              });
            },
            error => {
              console.log(error);
              if(error.status === 401){
                this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Veuillez vous assurer des données entrer','Login ou Mot de passe incorrecte', {
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

  onUploadFiles(files:File[]) : void {
    const formData = new FormData();
    for(const file of files){
      formData.append('files', file , file.name);
      this.filenames.push(file.name);
    }
    this.mail.upload(formData).subscribe(
      event => {
        console.log(event);
        this.reportProgress(event);
      },
      (error : HttpErrorResponse) => {
        console.log(error);
      }
    )

  }
  reportProgress(httpEvent: HttpEvent<String[]>):void {
    switch(httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.uploadStatus(httpEvent.loaded,httpEvent.total,'Uploading');
        break;
      case HttpEventType.ResponseHeader:
        console.log('header returned',httpEvent);
    }
  }
  private uploadStatus(loaded: number, total: number, requestType: string) {
    this.filestatus.status = 'progress';
    this.filestatus.requestType = requestType;
    this.filestatus.percent = Math.round(100 * loaded / total);

  }
  ngOnDestroy(): void {
    if(this.MailSub != undefined)
    this.MailSub.unsubscribe();
    this.userPrincipalSub.unsubscribe();

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
