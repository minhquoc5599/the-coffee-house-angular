import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../_modules/material/material.module';
import { AdminComponent } from './admin.component';
import { TopBarComponent } from '../_components/top-bar/top-bar.component';
import { SideBarComponent } from '../_components/side-bar/side-bar.component';
import { AccountsComponent } from '../accounts/accounts.component';
import { ProductsComponent } from '../products/products.component';
import { HomeComponent } from '../home/home.component';
import { TableComponent } from '../_components/table/table.component';
import { MultiColumnComponent } from '../_components/multi-column/multi-column.component';
import { MultiDialogComponent } from '../_components/multi-dialog/multi-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    TopBarComponent,
    SideBarComponent,
    HomeComponent,
    AccountsComponent,
    ProductsComponent,
    TableComponent,
    MultiColumnComponent,
    MultiDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
