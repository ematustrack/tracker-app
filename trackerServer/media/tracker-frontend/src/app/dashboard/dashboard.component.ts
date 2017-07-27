import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  active: boolean;
  start: string;
  end: string;
  constructor() {
    this.active = false;
    this.start = "2008-04-23T18:25:43.511Z";
    this.end = "2019-04-23T18:25:43.511Z";
  }

  ngOnInit() {
    console.log("date -> ", this.start);
    console.log("date -> ", this.end)
  }
  onSubmit(f: NgForm) {
    this.active = true;
    console.log("Form values -> ", f.value);
  }
}
