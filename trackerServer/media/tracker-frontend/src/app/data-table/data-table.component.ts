import {Component, ElementRef, ViewChild, Input} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {MdPaginator, MdSort, SelectionModel} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';

import { DataTableService } from '../shared/data-table.service';
import { DataTable } from '../shared/data-table';
import { Router }   from '@angular/router';


/**
 * @title Feature-rich data table
 */
@Component({
  selector: 'app-data-table',
  styleUrls: ['data-table.component.css'],
  templateUrl: 'data-table.component.html',
})
export class DataTableComponent {
  displayedColumns = ['select', 'foto', 'obra', 'st', 'folio', 'profesional'];
  exampleDatabase: ExampleDatabase | null;
  selection = new SelectionModel<string>(true, []);
  dataSource: ExampleDataSource | null;
  photos: DataTable[];
  @Input() start: string;
  @Input() end: string;
  @ViewChild(MdPaginator) paginator: MdPaginator;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private router: Router,
    private datatableService: DataTableService) {
  }

  ngOnInit() {
    console.log("start -> ", this.start);
    console.log("end -> ", this.end);
    this.exampleDatabase = new ExampleDatabase(this.datatableService, this.start, this.end);
    //this.getDataTable(this.start, this.end);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  gotoDetail(foto: string): void {
    this.router.navigate(['/detail', foto]);
  }

  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) { return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.exampleDatabase.data.length;
    }
  }

  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filter.nativeElement.value) {
      this.dataSource.renderedData.forEach(data => this.selection.select(data.foto));
    } else {
      this.exampleDatabase.data.forEach(data => this.selection.select(data.foto));
    }
  }
}


/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<DataTable[]> = new BehaviorSubject<DataTable[]>([]);
  get data(): DataTable[] { return this.dataChange.value; }
  photos: DataTable[];

  constructor(private datatableService: DataTableService, start: string, end: string) {
    // Fill up the database with 100 users.
    //for (let i = 0; i < 100; i++) { this.addUser(); }
    console.log("data in const ->", start, end);
    this.getDataTable(start, end);
  }

  //getDataTable call dataTableService with two dates
  getDataTable(start: string, end: string): void {
    this.datatableService.getData(start, end).then(photos => {
      //this.dataChange = photos;
      for (let i = 0; i < photos.length; i++) {
        const copiedData = this.data.slice();
        photos[i].id = (i + 1).toString();
        copiedData.push(photos[i]);
        this.dataChange.next(copiedData);
      }

      //console.log("data -> ", this.dataChange);
    })

  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: DataTable[] = [];
  renderedData: DataTable[] = [];

  constructor(private _exampleDatabase: ExampleDatabase,
    private _paginator: MdPaginator,
    private _sort: MdSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DataTable[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.mdSortChange,
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((item: DataTable) => {
        let searchStr = (item.obra + ' ' + item.st + ' ' + item.profesional).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: DataTable[]): DataTable[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'foto': [propertyA, propertyB] = [a.foto, b.foto]; break;
        case 'obra': [propertyA, propertyB] = [a.obra, b.obra]; break;
        case 'st': [propertyA, propertyB] = [a.st, b.st]; break;
        case 'folio': [propertyA, propertyB] = [a.folio, b.folio]; break;
        case 'profesional': [propertyA, propertyB] = [a.profesional, b.profesional]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}
