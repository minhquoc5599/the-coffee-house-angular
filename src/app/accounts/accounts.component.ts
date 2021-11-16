import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort
  public accountList!: MatTableDataSource<User>;
  public columnList: { name: string, sorted?: boolean, checkbox?: boolean, template?: string }[] = [
    {
      name: 'select',
      checkbox: true
    },
    {
      name: 'name',
      sorted: true,
    },
    {
      name: 'gender',
      sorted: true,
    },
    {
      name: 'role',
      sorted: true,
    },
    {
      name: 'phone',
      sorted: true,
    },
    {
      name: 'email',
      sorted: true,
    },
    {
      name: 'action'
    }
  ];
  public displayedColumns: string[] = this.columnList.map(col => col.name);

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAll().subscribe(accounts => {
      this.accountList = new MatTableDataSource<User>(accounts);
      this.accountList.paginator = this.paginator;
      this.accountList.sort = this.sort;
    });
  }
}
