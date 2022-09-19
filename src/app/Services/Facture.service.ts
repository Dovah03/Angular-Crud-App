import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//for local Env
import { environment } from "../../environments/environment";
//for prod Env
//import { environment } from "../../environments/environment.prod";
import { Facture } from "../model/Facture";

@Injectable({
  providedIn: "root",
})
export class FactureService {
  private ApiServerUrl = environment.ApiUrl;

  constructor(private http: HttpClient) {}

  public getFactures(): Observable<any> {
    return this.http.get<Facture>(`${this.ApiServerUrl}/facture/all`);
  }
  public getFactureById(id:number): Observable<any> {
    return this.http.get<Facture>(`${this.ApiServerUrl}/facture/find/${id}`)
  }
  public addBL(facture: Facture): Observable<any> {
    return this.http.post<Facture>(`${this.ApiServerUrl}/facture/add`, facture);
  }
  public updateBL(id: number, facture: Facture): Observable<any> {
    return this.http.put<Facture>(`${this.ApiServerUrl}/facture/update/${id}`, facture);
  }
  public deleteBL(id: number): Observable<any> {
    return this.http.delete<void>(`${this.ApiServerUrl}/facture/delete/${id}`);
  }
}
