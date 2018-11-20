import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxPivotGridModule, DxChartModule } from 'devextreme-angular';
import { PivotGridComponent } from '../pivot-grid/pivot-grid.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'viewer', component: PivotGridComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    DxPivotGridModule,
    DxChartModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PivotGridComponent
  ]
})
export class PivotGridsModule { }
