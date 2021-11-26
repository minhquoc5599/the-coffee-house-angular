import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { User } from 'src/app/_models/user';
import { AccountDialogComponent } from '../account-dialog/account-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() type: string = '';
  @Input() columnList: { name: string, sorted?: boolean, template?: TemplateRef<any> }[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() data!: MatTableDataSource<any>;

  @Output() reloadEvent = new EventEmitter<string>();
  @Output() createEvent = new EventEmitter<{ action: string }>();
  @Output() updateEvent = new EventEmitter<{ action: string, data: any }>();
  @Output() deleteEvent = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  public selection: SelectionModel<any> = new SelectionModel<any>(true, []);

  constructor(private _liveAnnouncer: LiveAnnouncer, private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      let variableChange = changes['data'];
      if (variableChange.currentValue) {
        this.data.paginator = this.paginator;
        this.data.sort = this.sort;
      }
    }
    if (changes['columnList']) {
      this.displayedColumns = this.columnList.map(col => col.name);
      this.displayedColumns.push('action');
      this.displayedColumns.unshift('checkbox');
    }
  }

  /**
   * @param {Sort} sortState 
   * @return {void}
   * @description Sorted.
   */
  public announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /**
   * @returns {boolean}
   * @description Check all selected.
   */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  /**
   * @returns {void}
   * @description Toggle all selected.
   */
  public masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.data.forEach(row => this.selection.select(row));
  }

  /**
   * @param {any} event 
   * @returns {void}
   * @description Search.
   */
  public search(event: any): void {
    console.log(event);
    this.data.filter = event.target.value.trim().toLocaleLowerCase();
  }

  /**
   * @returns {void}
   * @description Reload table
   */
  public reload(): void {
    this.reloadEvent.emit();
  }

  /**
   * 
   * @param {string} action
   * @returns {void}
   * @description Open create dialog 
   */
  public openCreateDialog(action: string): void {
    this.createEvent.emit({ action });
  }

  /**
   * 
   * @param {string} action 
   * @param {any}data 
   * @returns {void}
   * @description Open update dialog
   */
  public openUpdateDialog(action: string, data: any): void {
    this.updateEvent.emit({ action, data });
  }

  /**
   * @param {string} id
   * @param {strign} name 
   * @returns {void}
   * @description Open delete dialog and send  event delete to parent component
   */
  public openDeleteDialog(id: string, name: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent,
      {
        data: {
          type: this.type,
          name
        }
      });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirm) {
        this.deleteEvent.emit(id);
      }
    })
  }

  public deleteAll(){
    console.log(this.selection.selected);
  }
}
