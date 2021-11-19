import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-column',
  templateUrl: './multi-column.component.html',
  styleUrls: ['./multi-column.component.css']
})
export class MultiColumnComponent implements OnInit {
  @Input() type!: string;
  @Input() data!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
