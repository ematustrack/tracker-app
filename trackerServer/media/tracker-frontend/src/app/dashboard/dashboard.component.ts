import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import {MdSelectChange} from '@angular/material';
import {SelectionService} from '../shared/selection.service';
import {SelectionData} from '../shared/selection-data';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  active: boolean;
  @Input() defaultDateStart: Date;
  @Input() defaultDateEnd: Date;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(Date.now());
  selectionData: SelectionData;
  obras: string[];
  sts: string[];
  folios: string[];
  profesionales: string[];

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private selectionService: SelectionService,
    private route: ActivatedRoute,
    private r: Router) {
    dateAdapter.setLocale('nl'); //DD-MM-YYYY
    this.active = false;
    let date = new Date(Date.now());
    let date_end = date;
    this.defaultDateEnd = date_end;
    this.defaultDateStart = new Date(date);
    this.defaultDateStart.setDate(this.defaultDateStart.getDate() - 1);
    this.defaultDateStart = this.localISOTime(this.defaultDateStart);
    this.defaultDateEnd = this.localISOTime(this.defaultDateEnd);
    console.log("init ", this.defaultDateStart);
    console.log("end ", this.defaultDateEnd);
    //console.log(this.route.snapshot.params["init"]);
    /*this.route.params.subscribe(params => {
      if (!this.deepEquals(params, {}))
        this.assignData(params);
    });*/
  }

  ngOnInit() {

    this.getDataFilters();

  }
  assignData(params) {
    console.log("assignData");
    this.defaultDateStart = this.localISOTime(params["init"]);
    this.defaultDateEnd = this.localISOTime(params["end"]);

  }
  localISOTime(d): any {
    if (!d)
      d = new Date()
    var tzoffset = d.getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(d - tzoffset)).toISOString().slice(0, -1);
  }

  setData(array: string[]): any[] {
    let objetos = new Array<any>();
    objetos.push({ value: "", viewSelect: "Todas" });
    for (var ix of array) {
      objetos.push({ value: ix, viewSelect: ix });
    }
    return objetos;
  }
  getDataFilters(): void {
    this.selectionService.getData().then(data => {
      this.selectionData = data;
      this.obras = this.setData(this.selectionData[2]["obra"]);
      this.sts = this.setData(this.selectionData[0]["st"]);
      this.folios = this.setData(this.selectionData[1]["folio"]);
      this.profesionales = this.setData(this.selectionData[3]["profesional"]);
    });

  }
  @Input() selectedObra: string;
  @Input() selectedST: string;
  @Input() selectedFolio: string;
  @Input() selectedProfesional: string;


  start: string;
  end: string;
  obra: string;
  st: string;
  folio: string;
  profesional: string;

  XORDates(a, b): any {
    return (a && b) || (!a && !b) ? true : false;
  }
  ANDDates(a, b): any {
    return (a && b);
  }
  GreaterDates(a, b): any {
    return (a > b) ? true : false;
  }

  onSubmit(f: NgForm) {
    this.active = false;
    if (!this.XORDates(f.value["init"], f.value["end"])) {
      alert("Solo ingresaste una fecha.");
      return;
    }

    if (this.GreaterDates(f.value["init"], f.value["end"])) {
      alert("Las fechas no tienen coherencia.")
      return;
    }
    if (f.value["obra"] == null) {
      console.log("Obra no seleccionada");
    }
    if (f.value["st"] == null) {
      console.log("ST no seleccionada");
    }
    if (f.value["folio"] == null) {
      console.log("Folio no seleccionado");
    }
    if (f.value["profesional"] == null) {
      console.log("Profesional no seleccionado");
    }
    if (this.ANDDates(f.value["init"], f.value["init"])) {
      f.value["end"].setDate(f.value["end"].getDate() + 1);
      console.log(f.value["end"]);
      this.defaultDateStart = this.localISOTime(f.value["init"]);
      this.defaultDateEnd = this.localISOTime(f.value["end"]);
      this.start = this.defaultDateStart.toString();
      this.end = this.defaultDateEnd.toString();
    } else {
      this.start = "";
      this.end = "";
    }

    this.obra = f.value["obra"];
    this.st = f.value["st"];
    this.folio = f.value["folio"];
    this.profesional = f.value["profesional"];
    this.active = true;
    //this.r.navigate['/home'];
    console.log("Form values -> ", f.value);
  }

  deepEquals(x, y) {
    if (x === y) {
      return true; // if both x and y are null or undefined and exactly the same
    } else if (!(x instanceof Object) || !(y instanceof Object)) {
      return false; // if they are not strictly equal, they both need to be Objects
    } else if (x.constructor !== y.constructor) {
      // they must have the exact same prototype chain, the closest we can do is
      // test their constructor.
      return false;
    } else {
      for (const p in x) {
        if (!x.hasOwnProperty(p)) {
          continue; // other properties were tested using x.constructor === y.constructor
        }
        if (!y.hasOwnProperty(p)) {
          return false; // allows to compare x[ p ] and y[ p ] when set to undefined
        }
        if (x[p] === y[p]) {
          continue; // if they have the same strict value or identity then they are equal
        }
        if (typeof (x[p]) !== 'object') {
          return false; // Numbers, Strings, Functions, Booleans must be strictly equal
        }
        if (!this.deepEquals(x[p], y[p])) {
          return false;
        }
      }
      for (const p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
          return false;
        }
      }
      return true;
    }
  }
}
