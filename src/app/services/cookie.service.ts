import { Injectable } from '@angular/core';
import { CookieService as BaseCookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { UserModel } from '../common/models';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  isLoggedIn: Subject<boolean> = new Subject<boolean>();
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(
    private cookieService: BaseCookieService
  ) { }

  checkLogin(): boolean {
    let dataFromCookie: string = this.cookieService.get('loggedUser').trim();
    if (dataFromCookie.length == 0) {
      return false;
    }
    else{
      return true;
    }
  }

  saveLoginDataInCookies(loginData: UserModel, saveLogin: boolean = false): void {
    let dataToSave: string = '';
    dataToSave = loginData.userId + '|' + loginData.email + '|' + loginData.firstName + '|' + loginData.lastName + '|' + loginData.isAdmin;
    if (saveLogin) {
      let expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 7);
      this.cookieService.set('loggedUser', dataToSave, expiredDate, '/');
    } else {
      let expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() + 1);
      this.cookieService.set('loggedUser', dataToSave, expiredDate, '/');
    }
    this.isLoggedIn.next(true);
  }

  removeLoginDataFromCookies(): void {
    this.cookieService.delete("loggedUser");
    this.isLoggedIn.next(false);
  }

  getUserdataFromCookies(): UserModel {
    var dataFromCookie = this.cookieService.get('loggedUser').trim();
    if (dataFromCookie.length != 0) {
      var userArray = dataFromCookie.split("|");
      var userData: UserModel = new UserModel();
      userData.userId = userArray[0];
      userData.email = userArray[1];
      userData.firstName = userArray[2];
      userData.lastName = userArray[3];
      userData.isAdmin = userArray[4] === 'true';
      return userData;
    }
    return null;
  }

}
