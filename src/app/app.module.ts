import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { HttpService } from './services/http.service';
import { ModalService } from './services/modal.service';
import { AccountService } from './services/account.service';
import { PostService } from './services/post.service';
import { CommonService } from './services/common.service';

import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/account/login/login.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { CommentComponent } from './components/comment/comment.component';
import { HeaderComponent } from './components/partial/header/header.component';
import { FooterComponent } from './components/partial/footer/footer.component';
import { SidebarComponent } from './components/partial/sidebar/sidebar.component';
import { ChangepasswordComponent } from './components/account/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './components/account/forgotpassword/forgotpassword.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewpostComponent } from './components/viewpost/viewpost.component';
import { AppComponent } from './app.component';
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditprofileComponent } from './components/account/editprofile/editprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AccountComponent,
    LoginComponent,
    SignupComponent,
    EditpostComponent,
    CommentComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    DashboardComponent,
    ViewpostComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ModalModule.forRoot()
  ],
  providers: [
    HttpService,
    ModalService,
    AccountService,
    PostService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
