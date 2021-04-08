import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core"
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class ErrorService implements ErrorHandler{

    constructor(private http:HttpClient , private router:Router ,private toastr:ToastrService, private Auth:AuthService){}
    handleError(error: HttpErrorResponse): void {
        if(error.status === 0){
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Le serveur ne répond pas contactez votre Administrateur', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + 'top' + '-' +  'right'
                })        }
        if(error.status === 401){
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Session <b>Expirer</b> Veuillez vous reconnecter', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + 'top' + '-' +  'right'
                })
            console.error(error);
            this.Auth.logout();
            setTimeout(() => {
                this.router.navigate(['/login']).then( result => {
                    if (result) {
                      location.reload();
                    }
                  } );
            }, 2000);

        }
        
        if(error.status === 403){
            this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span> Vous n\'êtes pas <b>authorizer</b> a voir cette ressource', '', {
                timeOut: 8000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: 'toast-' + 'top' + '-' +  'right'
                })
                console.error(error);
            }
        if(error.status > 404 && error.status < 500){
            this.toastr.error('Error dans la requete','Request Error')
                console.error(error);
        }
        if(error.status >= 500){
            this.toastr.error('Erreur du Serveur , contacter votre administrateur','Server Error')
                console.error(error);
        }
        
    }
}