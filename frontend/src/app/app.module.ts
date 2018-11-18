import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';
import { ReportDesignerComponent } from './report-designer/report-designer.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { PivotGridComponent } from './pivot-grid/pivot-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardDesignerComponent,
    DashboardViewerComponent,
    ReportDesignerComponent,
    ReportViewerComponent,
    PivotGridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
