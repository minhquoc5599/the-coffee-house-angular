import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-multi-dialog',
  templateUrl: './multi-dialog.component.html',
  styleUrls: ['./multi-dialog.component.css']
})
export class MultiDialogComponent implements OnInit {
  public type!: string;
  public action!: string;
  public data: any;
  constructor(private dialogRef: MatDialogRef<MultiDialogComponent>, @Inject(MAT_DIALOG_DATA) private obj: any) {
    this.type = obj.type;
    this.action = obj.action;
    this.data = this.obj.obj;
  }

  ngOnInit(): void {
  }

  public confirmDialog() {
    if (this.action === 'delete') {
      this.dialogRef.close({ action: this.action, id: this.data.id });
    } else {
      this.dialogRef.close({ action: this.action, data: this.data });
    }
  }

}
