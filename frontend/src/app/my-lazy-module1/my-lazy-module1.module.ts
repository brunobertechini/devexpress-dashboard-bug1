import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'dashboards', loadChildren: '../dashboards/dashboards.module#DashboardsModule' },
      { path: 'reports', loadChildren: '../reports/reports.module#ReportsModule' },
      { path: 'pivot-grids', loadChildren: '../pivot-grids/pivot-grids.module#PivotGridsModule' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ ]
})
export class MyLazyModule1Module { }
