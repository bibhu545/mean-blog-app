import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditprofileComponent } from './components/account/editprofile/editprofile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { HomeComponent } from './components/home/home.component';
import { ViewpostComponent } from './components/viewpost/viewpost.component';
import { BaseGuard } from './services/guards/base.guard';

const routes: Routes = [
  { path: 'add-post', component: EditpostComponent, canActivate: [BaseGuard] },
  { path: 'edit-post', component: EditpostComponent, canActivate: [BaseGuard] },
  { path: 'my-contributions', component: DashboardComponent, canActivate: [BaseGuard] },
  { path: 'edit-profile', component: EditprofileComponent, canActivate: [BaseGuard] },
  { path: 'view-post', component: ViewpostComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
