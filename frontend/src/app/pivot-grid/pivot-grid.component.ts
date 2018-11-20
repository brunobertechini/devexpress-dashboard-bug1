import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DxPivotGridComponent,
         DxChartComponent } from 'devextreme-angular';
import { PivotGridService } from './pivot-grid.service';

@Component({
  selector: 'app-pivot-grid',
  templateUrl: './pivot-grid.component.html',
  styleUrls: ['./pivot-grid.component.css'],
  providers: [PivotGridService]
})
export class PivotGridComponent implements OnInit, AfterViewInit {

  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  @ViewChild(DxChartComponent) chart: DxChartComponent;

  pivotGridDataSource: any;

  constructor(service: PivotGridService) {
    this.customizeTooltip = this.customizeTooltip.bind(this);

    this.pivotGridDataSource = {
      fields: [{
        caption: "Region",
        width: 120,
        dataField: "region",
        area: "row",
        sortBySummaryField: "Total"
      }, {
        caption: "City",
        dataField: "city",
        width: 150,
        area: "row"
      }, {
        dataField: "date",
        dataType: "date",
        area: "column"
      }, {
        groupName: "date",
        groupInterval: "month",
        visible: false
      }, {
        caption: "Total",
        dataField: "amount",
        dataType: "number",
        summaryType: "sum",
        format: "currency",
        area: "data"
      }],
      store: service.getSales()
    };
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.pivotGrid.instance.bindChart(this.chart.instance, {
      dataFieldsDisplayMode: "splitPanes",
      alternateDataFields: false
    });

    setTimeout(() => {
        var dataSource = this.pivotGrid.instance.getDataSource();
        dataSource.expandHeaderItem('row', ['North America']);
        dataSource.expandHeaderItem('column', [2013]);
    }, 0);
  }

  customizeTooltip(args) {
    return {
      html: args.seriesName + " | Total<div class='currency'>" + args.valueText + "</div>"
    };
  }

}
