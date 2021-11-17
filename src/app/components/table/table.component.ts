import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  public selection: SelectionModel<any> = new SelectionModel<any>(true, []);

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

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
    }
  }

  ngOnInit(): void {
  }

  public announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

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

  // public click() {
  //   this.selection.selected.forEach(element => console.log(element.id));
  // }

}
