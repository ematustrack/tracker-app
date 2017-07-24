import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { DataTable } from './data-table';

@Injectable()
export class DataTableService {
  private Url = 'localhost:8080';  // URL to web api
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }
  getHero(id: number): Promise<DataTable> {
    const url = `${this.Url}/server/datatable`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as DataTable)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
