import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/common/models';
import { AccountMode } from 'src/app/common/utils';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'src/app/services/cookie.service';
import { HttpService } from 'src/app/services/http.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private modalService: ModalService,
    private http: HttpService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      let password: string = this.signupForm.get('password').value;
      let confirmPassword: string = this.signupForm.get('confirmPassword').value;
      if(password !== confirmPassword) {
        console.log('Passwords did not match.');
        return;
      }
      let apiData: any = {
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value,
        firstName: this.signupForm.get('firstName')?.value,
        lastName: this.signupForm.get('lastName')?.value,
        phone: this.signupForm.get('phone')?.value,
      };
      this.http.post('/account/signup', apiData).subscribe({
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
      this.signupForm.markAllAsTouched();
    }
  }

  openLogin(): void {
    this.accountService.setAccountMode(AccountMode.Login);
  }

  closeModal(): void {
    this.modalService.closeModal();
  }

}
