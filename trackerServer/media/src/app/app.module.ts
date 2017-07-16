import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2TableModule } from 'ng2-table/ng2-table';

import { AppComponent } from './app.component';

import { MdButtonModule, MdInputModule } from '@angular/material';

import 'hammerjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ObraStFolioComponent } from './obra-st-folio/obra-st-folio.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ObraStFolioComponent
  ],
  imports: [
    BrowserModule,
    MdButtonModule,
    Ng2TableModule,
    MdInputModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
