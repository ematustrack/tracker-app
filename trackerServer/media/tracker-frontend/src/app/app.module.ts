import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';

import { MdToolbarModule, MdCardModule, MdDatepickerModule } from '@angular/material';
import { MdInputModule, MdNativeDateModule, MdCheckboxModule} from '@angular/material';
import { MdButtonModule, MdTableModule, MdSortModule, MdPaginatorModule } from '@angular/material';
import {MdSelectModule, MdProgressSpinnerModule} from '@angular/material';


import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterTimeComponent } from './filter-time/filter-time.component';
import { FilterComponent } from './filter-time/filter/filter.component';
import { DataTableComponent } from './data-table/data-table.component';

import {DataTableService} from './shared/data-table.service';
import {SelectionService} from './shared/selection.service';
import { DataTableDetailComponent } from './data-table-detail/data-table-detail.component';
import { SelectionComponent } from './filter-time/selection/selection.component';

import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterTimeComponent,
    FilterComponent,
    DataTableComponent,
    DataTableDetailComponent,
    SelectionComponent,
    MapComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MdToolbarModule,
    MdCardModule,
    MdSelectModule,
    FormsModule,
    CommonModule,
    HttpModule,
    MdInputModule,
    MdProgressSpinnerModule,
    MdButtonModule,
    MdSortModule,
    MdTableModule,
    MdCheckboxModule,
    MdPaginatorModule,
    ReactiveFormsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    CdkTableModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB-5hOEDRCXoZkASuzZap7vQKgseipzlGo'
    })
  ],
  providers: [DataTableService, SelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
