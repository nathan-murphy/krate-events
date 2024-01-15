import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subject } from "rxjs";
import { inject } from "@angular/core";
import { UserService } from "../users/user.service";

export const IsAdminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  let hasPermission = new Subject<boolean>();
  inject(UserService)
    .getCurrentUserPermissions()
    .subscribe((permissions) => hasPermission.next(permissions.isAdmin));
  return hasPermission.asObservable();
};
