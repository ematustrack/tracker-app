import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';

import { MdToolbarModule, MdCardModule, MdDatepickerModule } from '@angular/material';
import { MdInputModule, MdNativeDateModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';

import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterTimeComponent } from './filter-time/filter-time.component';
import { FilterComponent } from './filter-time/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FilterTimeComponent,
    FilterComponent,
  ],
  imports: [
    BrowserModule,
    MdToolbarModule,
    MdCardModule,
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdDatepickerModule,
    MdNativeDateModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
