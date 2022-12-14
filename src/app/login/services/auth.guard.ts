import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private auth:AuthService, private router:Router) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {    
        return this.auth.isLoggedIn().pipe(map(
            (loggedin => loggedin? true : this.router.parseUrl('/login'))
        ))
    }
}