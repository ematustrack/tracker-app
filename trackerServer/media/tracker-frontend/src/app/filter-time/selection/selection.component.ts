import { Component, OnInit } from '@angular/core';
import {MdSelectChange} from '@angular/material';

import {SelectionService} from '../../shared/selection.service';
import {SelectionData} from '../../shared/selection-data';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent implements OnInit {
  selectionData: SelectionData;
  obras: string[];
  sts: string[];
  folios: string[];
  profesionales: string[];

  constructor(private selectionService: SelectionService) { }

  ngOnInit(): void {
    this.getDataFilters();
  }
  onSelect(value: string): void {
    this.selectedObra = value;
  }

  setData(array: string[]): any[] {
    let objetos = new Array<any>();
    objetos.push({ value: "" })
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


}
