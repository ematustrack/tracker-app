import { Component, OnInit } from '@angular/core';
import { MdButtonModule } from '@angular/material';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-filter-time',
  templateUrl: './filter-time.component.html',
  styleUrls: ['./filter-time.component.css']
})
export class FilterTimeComponent implements OnInit {
  defaultDateStart: string;
  defaultDateEnd: string;
  constructor() { }

  ngOnInit() {
    let date = new Date(Date.now());
    var date_end = date;
    this.defaultDateEnd = date_end.toISOString().replace(/T.*/, '').split('-').reverse().join('-');
    date.setDate(date.getDate() - 1);
    this.defaultDateStart = date.toISOString().replace(/T.*/, '').split('-').reverse().join('-');

    console.log("Fecha inicial -> ", this.defaultDateStart);
    console.log("Fecha final -> ", this.defaultDateEnd);
  }


}
