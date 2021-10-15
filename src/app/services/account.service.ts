import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from '../common/models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountMode: Subject<number> = new Subject<number>();
  accountMode$ = this.accountMode.asObservable();

  userData: Subject<UserModel> = new Subject<UserModel>();
  userData$ = this.userData.asObservable();

  constructor() { }

  setAccountMode(status: number): void {
    this.accountMode.next(status);
  }
}
