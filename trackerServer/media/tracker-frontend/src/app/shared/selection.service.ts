import { Injectable, } from '@angular/core';
import { Headers, RequestOptions, RequestMethod, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {SelectionData} from './selection-data';

@Injectable()
export class SelectionService {

  private Url = 'http://54.175.253.151';  // URL to web api
  constructor(private http: Http) { }

  getData(): Promise<SelectionData> {
    const url = `${this.Url}/server/datafilter/`;
    console.log("url -> ", url);

    return this.http
      .get(url)
      .toPromise()
      .then(response => response.json().data as SelectionData)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
