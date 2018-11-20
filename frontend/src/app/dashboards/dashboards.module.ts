import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDesignerComponent } from '../dashboard-designer/dashboard-designer.component';
import { DashboardViewerComponent } from '../dashboard-viewer/dashboard-viewer.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'designer', component: DashboardDesignerComponent },
      { path: 'viewer', component: DashboardViewerComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardDesignerComponent,
    DashboardViewerComponent,
  ]
})
export class DashboardsModule { }
