import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserModel } from 'src/app/common/models';
import { AccountMode } from 'src/app/common/utils';
import { AccountService } from 'src/app/services/account.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountMode: number = AccountMode.Login;

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.accountService.accountMode$.subscribe(data => {
      this.accountMode = data;
    })
  }

}
