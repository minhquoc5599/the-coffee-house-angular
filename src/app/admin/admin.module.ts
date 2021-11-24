import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../_modules/material/material.module';
import { AdminComponent } from './admin.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { TableComponent } from './components/table/table.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { AccountDialogComponent } from './components/account-dialog/account-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    TopBarComponent,
    SideBarComponent,
    HomeComponent,
    AccountsComponent,
    ProductsComponent,
    TableComponent,
    DeleteDialogComponent,
    AccountDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
