import { Component, OnInit, Input } from '@angular/core';
import { DateAdapter } from '@angular/material';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() type_d: string;
  @Input() date: string;
  @Input() value: string;
  minDate = new Date(2017, 0, 1);
  maxDate = new Date(Date.now());
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('nl'); //DD-MM-YYYY
  }

  ngOnInit() { }

}
