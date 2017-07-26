import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { DataTable } from './../shared/data-table';
import 'rxjs/add/operator/switchMap';
import { DataTableService } from './../shared/data-table.service';

@Component({
  selector: 'app-data-table-detail',
  templateUrl: './data-table-detail.component.html',
  styleUrls: ['./data-table-detail.component.css']
})
export class DataTableDetailComponent implements OnInit {

  @Input()
  foto: string;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private datatableService: DataTableService
  ) { }

  ngOnInit(): void {
    const img: string = "";

    this.route.params.subscribe((params: Params) => this.foto = params['id'])
    this.foto = 'data:image/jpg;base64,' + this.foto.toString();
  }
  goBack(): void {
    this.location.back();
  }

}
