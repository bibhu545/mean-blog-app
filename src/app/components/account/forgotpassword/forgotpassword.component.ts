import { Component, OnInit } from '@angular/core';
import { AccountMode } from 'src/app/common/utils';
import { AccountService } from 'src/app/services/account.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  userEmail: string;

  constructor(private modalService: ModalService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  closeAcountModal() {
    this.modalService.closeModal();
  }

  openLogin() {
    this.accountService.setAccountMode(AccountMode.Login);
  }


}
