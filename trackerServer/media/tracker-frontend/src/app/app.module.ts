import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';

import { MdToolbarModule, MdCardModule, MdDatepickerModule } from '@angular/material';
import { MdInputModule, MdNativeDateModule, MdCheckboxModule} from '@angular/material';
import { MdButtonModule, MdTableModule, MdSortModule, MdPaginatorModule } from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterTimeComponent } from './filter-time/filter-time.component';
import { FilterComponent } from './filter-time/filter/filter.component';
import { DataTableComponent } from './data-table/data-table.component';

import {DataTableService} from './shared/data-table.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterTimeComponent,
    FilterComponent,
    DataTableComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MdToolbarModule,
    MdCardModule,
    FormsModule,
    HttpModule,
    MdInputModule,
    MdButtonModule,
    MdSortModule,
    MdTableModule,
    MdCheckboxModule,
    MdPaginatorModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    CdkTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
