import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataTablesModule , DataTableDirective } from 'angular-datatables';
import { ExportExcelService } from '../../Services/export-excel.service';
import { themeService } from '../../Services/theme.service';
import { MailService } from '../../Services/mail.service';
import { ErrorService } from '../../login/services/error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mail } from '../../model/mail';
import { Subject, Subscription } from 'rxjs';
import { Client } from '../../model/Client';
import { UserService } from '../../user.service';
import { Devis } from '../../model/devis';
import { BC } from '../../model/BC';
import { BL } from '../../model/BL';
import { DevisService } from '../../login/services/devis.service';
import { AuthService } from '../../login/services/auth.service';
import { BCService } from '../../Services/BC.service';
import { BLService } from '../../Services/BL.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit,AfterViewChecked {
  @ViewChild(DataTableDirective, {static: false})
  private dtElement: DataTableDirective;
  client:Client;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private id:number;
  showLoadingSpinner:boolean = true;
  selectedClient : Client;
  selectedDevis : Devis;
  isDark:boolean;
  showtableheader:boolean = true;
  DevisList: Devis[] = [];
  BCList: BC[] = [];
  BLList: BL[] = [];
  dataForExcel = [];
  EmailForm: FormGroup;
  addDevisForm: FormGroup;
  filenames: string[] = [];
  Email:mail;
  MailSub: Subscription;
  isSelected: boolean = true;
  filestatus = {status: '', requestType: '', percent: 0};


  // approach 2
  devisArr : number[] = [];
  BCArr : number[] = [];
  BLArr : number[] = [];
  copyArr : number[] = [];
  DevisAAfficher: Devis[] = [];
  BCAAfficher: BC[] = [];
  BLAAfficher : BL[] = []

  constructor(public errService:ErrorService, public route: ActivatedRoute, private router:Router, private fb:FormBuilder,
    private userService : UserService, private devisService : DevisService, private bcService:BCService, private blService : BLService,
    private toastr:ToastrService, public ete: ExportExcelService, private theme:themeService,private mail:MailService,
    private Error:ErrorService,private Auth:AuthService,) {}

  ngOnInit(): void {
    this.dtOptions = {
      retrieve: true,
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

    this.EmailForm = this.fb.group({
      'to' : [null,Validators.required],
      'subject' : [null, Validators.required],
      'text' : [null, Validators.required],
      'filenames' : [this.filenames, Validators.required]
    });
    this.addDevisForm = this.fb.group({
      'numoffre' : [null, Validators.required],
    });
    this.theme.setCurrentTheme();

    this.id =+ this.route.snapshot.params['id'];
    this.userService.getClientbyId(this.id).subscribe((res : Client) => {
    this.client = res;
    console.log(this.client);
    res.devisID_list.forEach((n : number) => {console.log(n); this.devisService.getDevisById(n).subscribe((res : Devis) => {
      this.DevisAAfficher.push(res);
      console.log(this.DevisAAfficher)

    },
      (error ) => {
        this.errService.handleError(error);
      }

  )})
  res.bcid_list.forEach((n : number) => {console.log(n); this.bcService.getBcById(n).subscribe((res : BC) => {
    this.BCAAfficher.push(res);
    console.log(this.BCAAfficher)

  },
    (error: HttpErrorResponse ) => {
      this.errService.handleError(error);
    }

)})
res.blid_list.forEach((n : number) => {console.log(n); this.blService.getBlById(n).subscribe((res : BL) => {
  this.BLAAfficher.push(res);
  console.log(this.BLAAfficher)

},
  (error: HttpErrorResponse ) => {
    this.errService.handleError(error);
  }

)})

      this.dataForExcel.push(this.client);
  });
  console.log(this.DevisList)
  this.getDevis();
  this.getBC();
  this.getBL();

}


// approach 2 : array[]

onSelectDevis(devis:Devis){
  this.devisArr.push(devis.numOffre);
  devis.isSelected = true;
  console.log(this.devisArr);
}

onDeselectDevis(devis:Devis):void {
  const index = this.devisArr.indexOf(devis.numOffre);
  if(index!=-1)
  this.devisArr.splice(index, 1);
  devis.isSelected = false;
  console.log(this.devisArr);
}
onSelectBC(bc:BC){
  this.BCArr.push(bc.numoffre);
  bc.isSelected = true;
  console.log(this.BCArr);
}
onDeselectBC(bc:BC):void {
  const index = this.BCArr.indexOf(bc.numoffre);
  if(index!=-1)
  this.BCArr.splice(index, 1);
  bc.isSelected = false;
  console.log(this.BCArr);
}
onSelectBL(bl:BL){
  this.BLArr.push(bl.numoffre);
  bl.isSelected = true;
  console.log(this.BLArr);
}
onDeselectBL(bl:BL):void {
  const index = this.BLArr.indexOf(bl.numoffre);
  if(index!=-1)
  this.BLArr.splice(index, 1);
  bl.isSelected = false;
  console.log(this.BLArr);
}

onUpdateClient(){
  document.getElementById('annuler-affecterDevis').click();
  this.client.devisID_list = this.devisArr;
  this.DevisAAfficher = [];
  this.client.devisID_list.forEach((n : number) => {console.log(n); this.devisService.getDevisById(n).subscribe((res : Devis) => {
    this.DevisAAfficher.push(res);
   // console.log(this.DevisAAfficher)

  },
    (error ) => {
      this.errService.handleError(error);
    }

)});
 // console.log(this.devisArr);
  //console.log(this.client.devisID_list)
  this.userService.updateClient(this.client.mysqlid,this.client).subscribe(
    (res : Client) => {
    //  console.log(res);
      this.client = res;
     // console.log(this.client);
     this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span> Document Affecté/Retiré avec succès', 'Succès', {
      timeOut: 8000,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'right'
      });
    },
    (error:HttpErrorResponse) => {
      this.errService.handleError(error);
    }
    );
}

onUpdateClientBC(){
  document.getElementById('annuler-affecterBC').click();
  this.client.bcid_list = this.BCArr;
  this.client.bcid_list = this.BCArr;
  this.BCAAfficher = [];
  this.client.bcid_list.forEach((n : number) => {console.log(n); this.bcService.getBcById(n).subscribe((res : BC) => {
    this.BCAAfficher.push(res);
    console.log(this.BCAAfficher)

  },
    (error ) => {
      this.errService.handleError(error);
    }

)});
  console.log(this.BCArr);
  console.log(this.client.bcid_list)
  this.userService.updateClient(this.client.mysqlid,this.client).subscribe(
    (res : Client) => {
      console.log(res);
      this.client = res;
      console.log(this.client);
    },
    (error:HttpErrorResponse) => {
      this.errService.handleError(error);
    }
    );
}

onUpdateClientBL(){
  document.getElementById('annuler-affecterBL').click();
  this.client.blid_list = this.BLArr;
  this.BLAAfficher = [];
  this.client.blid_list.forEach((n : number) => {console.log(n); this.blService.getBlById(n).subscribe((res : BL) => {
    this.BLAAfficher.push(res);
    console.log(this.BLAAfficher)

  },
    (error ) => {
      this.errService.handleError(error);
    }

)});
  console.log(this.BLArr);
  console.log(this.client.blid_list)
  this.userService.updateClient(this.client.mysqlid,this.client).subscribe(
    (res : Client) => {
      console.log(res);
      this.client = res;
      console.log(this.client);
    },
    (error:HttpErrorResponse) => {
      this.errService.handleError(error);
    }
    );
}
// hmm
onAnnulerDevis(){
  this.devisArr = [];
}



//devis modal

public getDevis():void {
  this.Auth.isLoggedIn();
  this.showtableheader = true;
  this.devisService.getDevis().subscribe(
    (response : Devis[])  => {
      this.DevisList = response;
      response.forEach((devis:Devis) => {
        if(this.client.devisID_list.includes(devis.numOffre)){
          devis.isSelected=true;
        }
        else devis.isSelected = false;
      });
      console.log(response);
      this.dtTrigger.next();
      this.isDark = this.theme.getCurrentTheme();
    },
    (error) => {
      this.errService.handleError(error);
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

// bc modal

public getBC():void {
  this.Auth.isLoggedIn();
  this.showtableheader = true;
  this.bcService.getBC().subscribe(
    (response : BC[])  => {
      this.BCList = response;
      response.forEach((bc:BC) => {
        if(this.client.bcid_list.includes(bc.numoffre)){
          bc.isSelected=true;
        }
        else bc.isSelected = false;
        console.log(bc.isSelected)
      });
      console.log(response);
      this.isDark = this.theme.getCurrentTheme();
    },
    (error) => {
      this.errService.handleError(error);
      this.showLoadingSpinner = false;
      this.showtableheader = true;
      this.dtTrigger.next();
    },
  );
}

// bl modal

public getBL():void {
  this.Auth.isLoggedIn();
  this.showtableheader = true;
  this.blService.getBL().subscribe(
    (response : BL[])  => {
      this.BLList = response;
      this.showLoadingSpinner = false;
      response.forEach((bl:BL) => {
        if(this.client.blid_list.includes(bl.numoffre)){
          bl.isSelected=true;
        }
        else bl.isSelected = false;
      });
      console.log(response);
      this.isDark = this.theme.getCurrentTheme();
    },
    (error) => {
      this.errService.handleError(error);
      this.showLoadingSpinner = false;
      this.showtableheader = true;
      this.dtTrigger.next();
    },
  );
}

  onOpenModal(mode:string){
    const container = document.getElementById('main-content');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'devis') {
      this.devisArr = this.client.devisID_list;
      button.setAttribute('data-bs-target','#affectDevisModal');
    }
    if(mode === 'bc') {
      this.BCArr = this.client.bcid_list;
      button.setAttribute('data-bs-target','#affectBCModal');
    }
    if(mode === 'affbc') {
      button.setAttribute('data-bs-target','#afficherBCModal');
    }
    if(mode === 'bl') {
      this.BLArr = this.client.blid_list;
      button.setAttribute('data-bs-target','#affectBLModal');
    }
    if(mode === 'affbl') {
      button.setAttribute('data-bs-target','#afficherBLModal');
    }
    if(mode === 'affdevis') {
      button.setAttribute('data-bs-target','#afficherDevis');
    }
    if(mode === 'mail') {
      button.setAttribute('data-bs-target','#sendMailModal');
    }
    container.appendChild(button);
    button.click();

  }



  //mail

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


//questionable





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
}
