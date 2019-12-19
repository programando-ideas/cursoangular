import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from '../security.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private securityService: SecurityService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.securityService.GetToken();
        if (token) {
            // clone: https://angular.io/guide/http#immutability
            req = req.clone({
                setHeaders: {
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }

}
