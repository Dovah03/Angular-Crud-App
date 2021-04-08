import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("JWT");

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}