import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from "../cookie.service";

@Injectable({
    providedIn: 'root'
})
export class BaseGuard implements CanActivate {

    constructor(
        private cookieService: CookieService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.cookieService.checkLogin();
    }
}