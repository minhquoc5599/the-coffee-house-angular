import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.css']
})
export class MultiComponent implements OnInit {
  @Input() type!: string;
  @Input() data!: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
