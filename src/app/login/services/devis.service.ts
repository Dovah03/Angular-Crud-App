import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Devis } from "../../model/devis";
//for local Env
import { environment } from "../../../environments/environment";
//for prod Env
//import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private ApiServerUrl = environment.ApiUrl;

  constructor(private http:HttpClient){}

  public getDevis(): Observable<any> {
    return this.http.get<Devis[]>(`${this.ApiServerUrl}/devis/all`);
  }
  public getDevisById(devisId:number):Observable<any>{
    return this.http.get<Devis>(`${this.ApiServerUrl}/devis/find/${devisId}`);
  }
  public addDevis(devis: Devis):Observable<any> {
    return this.http.post<Devis>(`${this.ApiServerUrl}/devis/create`,devis);
  }
  public updateDevis(devisId: number,devis: Devis): Observable<any>{
    return this.http.post<Devis>(`${this.ApiServerUrl}/devis/update/${devisId}`,devis);
  }
  public deleteDevis(devisId: number): Observable<any> {
    return this.http.delete<void>(`${this.ApiServerUrl}/devis/delete/${devisId}`);
  }
}
