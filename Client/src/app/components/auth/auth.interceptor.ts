import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authServ: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (this.authServ.isLogin && this.authServ.Token != '') {
            const token = this.authServ.Token;
            const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            return next.handle(clonedRequest);

        }
        return next.handle(req);
    }
}