import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MultiDialogComponent } from '../multi-dialog/multi-dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() type: string = '';
  @Input() columnList: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() data!: MatTableDataSource<any>;

  @Output() reloadEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<string>();
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
    }
  }

  ngOnInit(): void {
  }

  // Sort
  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Select
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.data.data.forEach(row => this.selection.select(row));
  }

  // Search
  public search(event: any) {
    this.data.filter = event.target.value.trim().toLocaleLowerCase();
  }

  // Reload
  public reload() {
    this.reloadEvent.emit();
  }

  // Open dialog
  public openDialog(action: string, type: string, obj: any) {
    const dialogRef = this.dialog.open(MultiDialogComponent,
      {
        data: {
          action,
          type,
          obj
        }
      });
    dialogRef.afterClosed().subscribe(result => {
      switch (result.action) {
        case 'edit': {
          this.editItem(result.data);
          break;
        }
        case 'delete': {
          this.deleteItem(result.id);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  // Edit item
  public editItem(data: any) {
    this.editEvent.emit(data);
  }

  // Delete item
  public deleteItem(id: string) {
    this.deleteEvent.emit(id);
  }
}
