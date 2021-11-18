import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
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

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.reload();
  }

  public reload() {
    this.accountService.getAll().subscribe(accounts => {
      this.accountList = new MatTableDataSource<User>(accounts);
    });
  }
}
