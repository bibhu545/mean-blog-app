import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/common/models';
import { AccountMode } from 'src/app/common/utils';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService,
    private http: HttpService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  openSignup(): void {
    this.accountService.setAccountMode(AccountMode.Signup);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

  login(): void {
    if (this.loginForm.valid) {
      let apiData: any = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      };
      this.http.post('/account/login', apiData).subscribe({
        next: response => {
          if (response) {
            let userData: UserModel = new UserModel();
            userData.email = response.data?.email;
            userData.userId = response.data?._id;
            userData.firstName = response.data?.firstName;
            userData.lastName = response.data?.lastName;
            userData.phone = response.data?.phone;
            userData.isAdmin = response.data?.isAdmin;
            this.accountService.userData.next(userData);
            this.cookieService.saveLoginDataInCookies(userData);
            this.modalService.closeModal();
          }
        },
        error: err => {
          console.log(err);
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

}
