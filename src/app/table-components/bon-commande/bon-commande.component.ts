import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewChecked, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BC } from '../../model/BC';
import { BCService } from '../../Services/BC.service';
import {jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportExcelService } from '../../Services/export-excel.service';
import * as logo from "../../Services/myLogo.js";
import { themeService } from '../../Services/theme.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailService } from '../../Services/mail.service';
import { ErrorService } from '../../login/services/error.service';
import { Subscription } from 'rxjs';
import { mail } from '../../model/mail';
import { UserService } from '../../user.service';
import { User } from '../../user';


@Component({
  selector: 'app-bon-commande',
  templateUrl: './bon-commande.component.html',
  styleUrls: ['./bon-commande.component.css']
})
export class BonCommandeComponent implements OnInit,AfterViewChecked {
  title = 'angular-export-to-excel';


  @Input() bc:BC;
  private id:number;
  showLoadingSpinner:boolean = true;
  private userPrincipalSub: Subscription;
  currentUser : User;
  role : string;
  dataForExcel = [];
  EmailForm: FormGroup;
  MailSub: Subscription;
  filestatus = {status: '', requestType: '', percent: 0};
  filenames: String[] = [];
  Email:mail ;
  isDark: boolean;


  constructor(public route: ActivatedRoute,
              private router:Router,
              private fb:FormBuilder,
              private userService:UserService,
              private BCservice : BCService,
              private toastr:ToastrService,
              public ete: ExportExcelService,
              private theme:themeService,
              private mail:MailService,
              private Error:ErrorService) {}

  ngOnInit(): void {
    this.userPrincipalSub = this.userService.user$.subscribe(user => {
      this.currentUser = user;
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
    this.BCservice.getBcById(this.id).subscribe((res : BC) => {
      this.bc = res;
      this.showLoadingSpinner = false;
      this.dataForExcel.push(this.bc)
    })




  };
  onOpenModal(mode:string): void{
    const container = document.getElementById('main-content');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'edit') {
      button.setAttribute('data-bs-target','#editBCModal');
    }
    if(mode === 'delete') {
      button.setAttribute('data-bs-target','#deleteBCModal');
    }
    if(mode === 'mail') {
      button.setAttribute('data-bs-target','#sendMailModal');
    }
    container.appendChild(button);
    button.click();
  }
  onEdit(bc:BC){
    document.getElementById('annuler-edit').click();
    this.showLoadingSpinner = true;
    this.BCservice.updateBC(this.id,bc).subscribe(
      (response: BC)  => {
        this.showLoadingSpinner = false;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Bon de commande de numero d\'offre '+response.numoffre+' modifié avec succées','Bon de commande modifier' ,{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        this.router.navigate(["/BC/"])
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
  onDelete(){
    document.getElementById('annuler-delete').click();
    this.showLoadingSpinner = true ;
    this.BCservice.deleteBC(this.id).subscribe(
      (response: BC)  => {
        this.showLoadingSpinner = false ;
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>Bon de Commande Supprimer avec succées','Bon de Commande Supprimer',{
          timeOut: 2000,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + 'top' + '-' +  'right'
          });
        console.log(response);
        this.router.navigateByUrl("/BC")
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
  onPDF(){
      let doc = new jsPDF();
      let ImageDate = logo.logoImage;
      doc.setDrawColor(66,150,50);
    doc.rect(10, 10, 190, 280)

    //rec ref
    doc.setDrawColor(40,218,163);
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

    //rec desi
    doc.setDrawColor(40,218,163);
    doc.setFillColor(255, 0, 0)
    doc.rect(31, 264, 32, 8)

      doc.addImage(ImageDate,'JPEG',20,10,120,40)
      doc.setFont('helvetica','Bold')
      doc.text( 'Details du bon de commande de Numero : '+ this.bc.numoffre,53,100)
      doc.text("Issue à la date : "+this.bc.date,57,110);
      doc.setFont('Bold');
      doc.text('Référence                               :                         '+this.bc.ref,33,170)
      doc.text('Quantité                                 :                         '+this.bc.qty,33,190)
      doc.text('Prix Unitaire                          :                         '+this.bc.p_u_ht+' DH H.T',33,210)
      doc.text('Montant Total                        :                         '+this.bc.m_ht+' DH H.T',33,230)
      doc.text('Prix Total                               :                         '+this.bc.total+' DH',33,250)
      doc.text('Désignation                            :                         '+this.bc.desi,33,270)

      doc.save('ISOQUALTECH_BC.pdf');
  }

  exportToExcel() {

    let reportData = {
      title: 'Isoqualtech Bon de Commande',
      data: this.dataForExcel[0],
    }

    this.ete.exportBCExcel(reportData);
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
            this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Email Envoyé avec succés', 'Email envoyer', {
              timeOut: 8000,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: 'toast-' + 'top' + '-' +  'right'
              });
            },
            error => {
              console.log(error);
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

  applyTheme(){
    this.theme.setCurrentTheme();
    this.isDark = this.theme.getCurrentTheme();
  }


  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.applyTheme()
  }

  ngOnDestroy(): void {
    if(this.MailSub != undefined)
    this.MailSub.unsubscribe();
    this.userPrincipalSub.unsubscribe();
  }
}
