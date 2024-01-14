import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subject } from "rxjs";
import { inject } from "@angular/core";
import { AuthService } from "./auth.service";

export const CanHostGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  let hasPermission = new Subject<boolean>();
  let ret;
  inject(AuthService)
    .getPermissions()
    .subscribe((permissions) => {
      hasPermission.next(permissions.canHost);
      ret = hasPermission.asObservable();
      if(!permissions.canHost) {
        ret = inject(Router).createUrlTree(["login"])
      }
    });
  return ret;
};
