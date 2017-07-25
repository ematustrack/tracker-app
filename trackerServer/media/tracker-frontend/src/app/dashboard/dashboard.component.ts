import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  active: boolean;

  constructor() {
    this.active = false;
  }

  ngOnInit() {
  }
  onSubmit(f: NgForm) {
    this.active = true;
    console.log("Form values -> ", f.value);
  }
}
