import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-account-dialog',
  templateUrl: './account-dialog.component.html',
  styleUrls: ['./account-dialog.component.css']
})
export class AccountDialogComponent implements OnInit {
  public form!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { action: string, data: User },
    private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(this.data.data);
    const temp = this.form.controls;
    for (const key in temp) {
      this.form.controls[key].addValidators(Validators.required);
    }
  }

  ngOnInit(): void {
  }

  /**
   * @returns {void}
   * @description Confirm dialog and send data to Accounts Component
   */
  public confirmDialog(): void {
    this.dialogRef.close({data: this.form.value});
  }

}
