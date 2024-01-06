import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "./user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor(private UserService: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.UserService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });
    return next.handle(authRequest);
  }
}
