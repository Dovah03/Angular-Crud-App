import { HttpClient, HttpErrorResponse, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { mail } from "../model/mail";

@Injectable({
  providedIn: "root",
})
export class MailService {
  private ApiServerUrl = environment.ApiUrl;

  constructor(private http: HttpClient) {}

  errorHandler(error: HttpErrorResponse) {
    return throwError(error || "Server Error");
  }

  public Mail(email:mail): Observable<any> {
    console.log(email);
    return this.http
      .post<mail>(`${this.ApiServerUrl}/mail/send`, email )
      .pipe(catchError(this.errorHandler));
  }

  upload(formData : FormData):Observable<HttpEvent<String[]>> {
    return this.http.post<string[]>(`${this.ApiServerUrl}/files/upload`, formData,{
      reportProgress : true,
      observe: 'events',
    }
    )};
}
