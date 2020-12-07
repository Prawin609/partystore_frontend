import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor {

  constructor( private authService : AuthenticateService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    let authHeaderString = this.authService.getAuthenticatedToken();
    let username = this.authService.getAuthenticatedUser();

    if(authHeaderString && username){
      req = req.clone({
        setHeaders : {
          Authorization : authHeaderString
        }
      })
    }
    return next.handle(req);
  }
}
