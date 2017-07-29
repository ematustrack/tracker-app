import { Component, OnInit, Input } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DateAdapter } from '@angular/material';
import {MdSelectChange} from '@angular/material';
import {SelectionService} from '../shared/selection.service';
import {SelectionData} from '../shared/selection-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  active: boolean;
  start: string;
  end: string;
  defaultDateStart: Date;
  defaultDateEnd: Date;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(Date.now());
  selectionData: SelectionData;
  obras: string[];
  sts: string[];
  folios: string[];
  profesionales: string[];

  constructor(private dateAdapter: DateAdapter<Date>, private selectionService: SelectionService) {
    dateAdapter.setLocale('nl'); //DD-MM-YYYY
    this.active = false;
  }

  ngOnInit() {
    let date = new Date(Date.now());
    let date_end = date;
    this.defaultDateEnd = date_end;
    this.defaultDateStart = new Date(date);
    this.defaultDateStart.setDate(this.defaultDateStart.getDate() - 1);
    this.defaultDateStart = this.localISOTime(this.defaultDateStart);
    this.defaultDateEnd = this.localISOTime(this.defaultDateEnd);
    console.log("init ", this.defaultDateStart);
    console.log("end ", this.defaultDateEnd);
    this.getDataFilters();
  }

  localISOTime(d): any {
    if (!d)
      d = new Date()
    var tzoffset = d.getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(d - tzoffset)).toISOString().slice(0, -1);
  }

  setData(array: string[]): any[] {
    let objetos = new Array<any>();
    for (var ix of array) {
      objetos.push({ value: ix });
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
  selectedObra: string;
  selectedST: string;
  selectedFolio: string;
  selectedProfesional: string;

  onSubmit(f: NgForm) {
    if (!f.value["init"]) {
      alert("Ingrese la fecha de inicio.");
      return;
    }
    if (!f.value["end"]) {
      alert("Ingrese la fecha final.");
      return;
    }
    if (f.value["init"] > f.value["end"]) {
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
    this.defaultDateStart = this.localISOTime(f.value["init"]);
    this.defaultDateEnd = this.localISOTime(f.value["end"]);
    this.active = true;
    console.log("Form values -> ", f.value);
  }
}
