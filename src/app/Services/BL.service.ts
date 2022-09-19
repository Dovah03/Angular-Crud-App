import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
//for local Env
import { environment } from "../../environments/environment";
//for prod Env
//import { environment } from "../../environments/environment.prod";
import { BL } from "../model/BL";

@Injectable({
  providedIn: "root",
})
export class BLService {
  private ApiServerUrl = environment.ApiUrl;

  constructor(private http: HttpClient) {}

  public getBL(): Observable<any> {
    return this.http.get<BL>(`${this.ApiServerUrl}/bl/all`);
  }
  public getBlById(id:number): Observable<any> {
    return this.http.get<BL>(`${this.ApiServerUrl}/bl/find/${id}`)
  }
  public addBL(bl: BL): Observable<any> {
    return this.http.post<BL>(`${this.ApiServerUrl}/bl/add`, bl);
  }
  public updateBL(id: number, bl: BL): Observable<any> {
    return this.http.post<BL>(`${this.ApiServerUrl}/bl/update/${id}`, bl);
  }
  public deleteBL(id: number): Observable<any> {
    return this.http.delete<void>(`${this.ApiServerUrl}/bl/delete/${id}`);
  }
}
