import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInAuthGuard } from './_guards/logged-in-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(md => md.LoginModule),
    canLoad: [LoggedInAuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./admin/admin.module').then(md => md.AdminModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
