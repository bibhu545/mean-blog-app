import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { HomeComponent } from './components/home/home.component';
import { ViewpostComponent } from './components/viewpost/viewpost.component';
import { BaseGuard } from './services/guards/base.guard';

const routes: Routes = [
  { path: 'add-post', component: EditpostComponent, canActivate: [BaseGuard] },
  { path: 'edit-post', component: EditpostComponent, canActivate: [BaseGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [BaseGuard] },
  { path: 'view-post', component: ViewpostComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
