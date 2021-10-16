import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/common/models';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'src/app/services/cookie.service';
import { ModalService } from 'src/app/services/modal.service';
import { AccountComponent } from '../../account/account.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userData: UserModel;
  isLoggedIn: boolean = false;

  constructor(
    private modalService: ModalService,
    private cookieService: CookieService,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.cookieService.checkLogin();
    this.cookieService.isLoggedIn$.subscribe(data => {
      this.isLoggedIn = data;
    });
    this.accountService.userData$.subscribe(data => {
      if (data) {
        this.userData = data;
      }
    });
  }

  logout(): void {
    this.cookieService.removeLoginDataFromCookies();
    this.router.navigateByUrl('/');
  }

  contribute(): void {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/add-post');
    }
    else {
      this.modalService.openModal(AccountComponent);
    }
  }

}
