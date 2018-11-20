import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxReportViewerModule, DxReportDesignerModule } from 'devexpress-reporting-angular';
import { DxPivotGridModule, DxChartModule } from 'devextreme-angular';
import { DashboardDesignerComponent } from '../dashboard-designer/dashboard-designer.component';
import { DashboardViewerComponent } from '../dashboard-viewer/dashboard-viewer.component';
import { ReportDesignerComponent } from '../report-designer/report-designer.component';
import { ReportViewerComponent } from '../report-viewer/report-viewer.component';
import { PivotGridComponent } from '../pivot-grid/pivot-grid.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboard-designer', component: DashboardDesignerComponent },
      { path: 'dashboard-viewer', component: DashboardViewerComponent },
      { path: 'report-designer', component: ReportDesignerComponent },
      { path: 'report-viewer', component: ReportViewerComponent },
      { path: 'pivot-grid', component: PivotGridComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    DxReportViewerModule,
    DxReportDesignerModule,
    DxPivotGridModule,
    DxChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardDesignerComponent,
    DashboardViewerComponent,
    ReportDesignerComponent,
    ReportViewerComponent,
    PivotGridComponent,
  ]
})
export class MyLazyModule1Module { }
