import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardDesignerComponent } from './dashboard-designer/dashboard-designer.component';
import { DashboardViewerComponent } from './dashboard-viewer/dashboard-viewer.component';
import { ReportDesignerComponent } from './report-designer/report-designer.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { PivotGridComponent } from './pivot-grid/pivot-grid.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard-designer', component: DashboardDesignerComponent },
  { path: 'dashboard-viewer', component: DashboardViewerComponent },
  { path: 'report-designer', component: ReportDesignerComponent },
  { path: 'report-viewer', component: ReportViewerComponent },
  { path: 'pivot-grid', component: PivotGridComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardDesignerComponent,
    DashboardViewerComponent,
    ReportDesignerComponent,
    ReportViewerComponent,
    PivotGridComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
