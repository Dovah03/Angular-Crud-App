import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import { User } from './user';
import { environment } from '../environments/environment';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from './login/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  Jwt:any;
  private ApiServerUrl = environment.ApiUrl;
  private user: User
  //private users: User[] = [];
  //private usersListSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);
  //users$: Observable<User[]> = this.usersListSubject.asObservable();
  private UserSubject : ReplaySubject<User> = new ReplaySubject<User>(1);
  user$ :Observable<User> = this.UserSubject.asObservable();
  islogged:boolean=false;
  //loggedInStatus=JSON.parse(localStorage.getItem('loggedin') || 'false');

  constructor(private http: HttpClient,private authService:AuthService) {
    //sets AppCurrentUser to subscribe to using local storage set from login();
   }



  //public get isloggedIn() {
   // return JSON.parse(localStorage.getItem('loggedin') || this.loggedInStatus.toString())
  // }

 /* public changeUserPrincipal(userP: User){
    this.user = userP;
    this.UserPrincipalSource.next(this.user);
  }
*/
/*
  getUsersList():Observable<User[]> {
    return this.getUsers().pipe(tap(
      users => {
        this.setUsersList(users)
      },
      error => {
        this.errorHandler(error);
      }
    ))
  }
  */
  /*
    setUsersList(users: User[]){
    this.users = users;
    this.usersListSubject.next(users);
  }
  */
  unsubFromBSubject(){
    this.UserSubject.unsubscribe();
  }
  setCurrentUser(user:User){
    this.user = user;
    this.UserSubject.next(user);
  }

  private changePsw(currentPassword: string, newPassword:string){
    return this.http.put<User>(`${this.ApiServerUrl}/user/changepsw`, {currentPassword,newPassword}).pipe(catchError(this.errorHandler));
  }

  public changePswImpl(currentPassword: string, newPassword:string){
    return this.changePsw(currentPassword,newPassword).pipe(tap(
      res => {
        this.setCurrentUser(res);
      }
    ))
   }

   public getCurrentUserImpl(): Observable<any> {
    return this.getCurrentUser().pipe(tap(
      user => {
        this.setCurrentUser(user);
      },
      error => {
        this.errorHandler(error);
      }
    ));
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get<User>(`${this.ApiServerUrl}/user/current/`).pipe(catchError(this.errorHandler));
  }

  private login(username: string,password: string): Observable<any>{
    return this.http.post<any>(`${this.ApiServerUrl}/user/auth`, {username,password}).pipe(catchError(this.errorHandler))
  }

  public loginImpl(username: string,password: string): Observable<any>{
    return this.login(username,password).pipe(tap(res=>{
      let jwt = "Bearer " + res.accessToken;
      localStorage.setItem("JWT", jwt);
      this.setCurrentUser(res.currentUser);
      this.authService.login();
      })).pipe(
        map(res=>{return res = res.currentUser})
      );
  }

  public getUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.ApiServerUrl}/user/all`);
  }

  public addUser(user: User): Observable<any> {
    return this.http.post<User>(`${this.ApiServerUrl}/user/create`, user);
  }

  private UpdateUser(userId: number, user: User): Observable<any> {
    return this.http.put<User>(`${this.ApiServerUrl}/user/update/${userId}`, user);
  }

  public UpdateUserImpl(userId: number, user: User): Observable<any> {
    return this.UpdateUser(userId, user)
  }

  public UpdateUserProfile(userId: number, user: User): Observable<any> {
    return this.UpdateUser(userId, user).pipe(
      tap((response: User)  =>
        this.setCurrentUser(response)
        )
    )
  }
  public deleteUser(userId: number): Observable<any> {
    return this.http.delete<void>(`${this.ApiServerUrl}/user/delete/${userId}`);
  }

  public deactivateUser(userId: number, user: User): Observable<any> {
    return this.http.put<User>(`${this.ApiServerUrl}/user/deactivate/${userId}`, user);
  }

  public activateUser(userId: number, user: User): Observable<any> {
    return this.http.put<User>(`${this.ApiServerUrl}/user/activate/${userId}`, user);
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error || 'Server Error');
  }
}
