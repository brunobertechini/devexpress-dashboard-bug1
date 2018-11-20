import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxReportViewerModule, DxReportDesignerModule } from 'devexpress-reporting-angular';
import { ReportDesignerComponent } from '../report-designer/report-designer.component';
import { ReportViewerComponent } from '../report-viewer/report-viewer.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'designer', component: ReportDesignerComponent },
      { path: 'viewer', component: ReportViewerComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    DxReportViewerModule,
    DxReportDesignerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ReportDesignerComponent,
    ReportViewerComponent
  ]
})
export class ReportsModule { }
