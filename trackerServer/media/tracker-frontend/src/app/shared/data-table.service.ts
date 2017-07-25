import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { DataTable } from './data-table';

@Injectable()
export class DataTableService {
  private Url = 'https://f877e108.ngrok.io';  // URL to web api
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getHero(): Promise<DataTable[]> {
    const url = `${this.Url}/server/datatable/`;
    const options = new RequestOptions({ headers: this.headers });

    console.log("[url request] ", url);
    console.log("[headers] ", this.headers);
    console.log("[options] ", options);
    return this.http
      .post(url, JSON.stringify({ headers: this.headers }))
      .toPromise()
      .then(response => response.json().data as DataTable[])
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
