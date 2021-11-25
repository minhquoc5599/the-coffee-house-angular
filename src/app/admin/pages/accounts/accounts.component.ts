import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { User } from '../../../_models/user';
import { AccountService } from '../../../_services/account.service';
import { AccountDialogComponent } from '../../components/account-dialog/account-dialog.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public accountList!: MatTableDataSource<User>;
  public columnList: { name: string, sorted?: boolean, template?: TemplateRef<any> }[] = [
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
    }
  ];
  constructor(private accountService: AccountService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.reload();
  }

  /**
   * @return {void} 
   * @description Reload account list
   */
  public reload(): void {
    this.accountService.getAll().subscribe(accounts => {
      this.accountList = new MatTableDataSource<User>(accounts);
    });
  }

  /**
   * @param {User} data 
   * @returns {void}
   * @description Update Account
   */
  public updateAccount(data: User): void {
    this.accountService.update(data.id, data).subscribe(() => {
      const index = this.accountList.data.findIndex(account => account.id === data.id);
      this.accountList.data[index] = JSON.parse(JSON.stringify(data));
      this.accountList.data = [... this.accountList.data];
    });
  }

  /**
   * 
   * @param {action: string, data: User} event
   * @returns {void}
   * @description Open dialog with action update 
   */
  public openDialog(event: {action: string, data: User}): void{
    const dialogRef =this.dialog.open(AccountDialogComponent,
      {
        data:{
          action: event.action,
          data: event.data
        }
      });
      dialogRef.afterClosed().subscribe((result: {confirm: string, data: User}) =>{
        if(result.data){
          switch (event.action){
            case 'update':{
              this.updateAccount(result.data);
              break;
            }
            default: {
              break;
            }
          }
        }
      })
  }

  /**
   * 
   * @param {string} id 
   * @returns {void}
   * @description Delete account
   */
  public deleteAccount(id: string): void {
    this.accountService.delete(id).subscribe(() => {
      this.accountList.data = this.accountList.data.filter(account => account.id !== id)
    });
  }
}
