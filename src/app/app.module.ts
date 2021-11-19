import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { LoggedInAuthGuard } from './logged-in-auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { TopBarComponent } from './_components/top-bar/top-bar.component';
import { SideBarComponent } from './_components/side-bar/side-bar.component';
import { AccountsComponent } from './accounts/accounts.component';
import { ProductsComponent } from './products/products.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './_components/table/table.component';
import { MaterialModule } from './_modules/material/material.module';
import { MultiDialogComponent } from './_components/multi-dialog/multi-dialog.component';
import { MultiColumnComponent } from './_components/multi-column/multi-column.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    AdminComponent,
    TopBarComponent,
    SideBarComponent,
    AccountsComponent,
    ProductsComponent,
    HomeComponent,
    TableComponent,
    MultiColumnComponent,
    MultiDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [AuthGuard, LoggedInAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
