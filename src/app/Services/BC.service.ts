import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//for local Env
import { environment } from "../../environments/environment";
//for prod Env
//import { environment } from "../../environments/environment.prod";
import { BC } from "../model/BC";

@Injectable({
  providedIn: "root",
})
export class BCService {
  private ApiServerUrl = environment.ApiUrl;

  constructor(private http: HttpClient) {}

  public getBC(): Observable<any> {
    return this.http.get<BC>(`${this.ApiServerUrl}/bc/all`);
  }
  public getBcById(id:number): Observable<any> {
    return this.http.get<BC>(`${this.ApiServerUrl}/bc/find/${id}`)
  }
  public addBC(bc: BC): Observable<any> {
    return this.http.post<BC>(`${this.ApiServerUrl}/bc/add`, bc);
  }
  public updateBC(id: number, bc: BC): Observable<any> {
    return this.http.post<BC>(`${this.ApiServerUrl}/bc/update/${id}`, bc);
  }
  public deleteBC(id: number): Observable<any> {
    return this.http.delete<void>(`${this.ApiServerUrl}/bc/delete/${id}`);
  }
}
