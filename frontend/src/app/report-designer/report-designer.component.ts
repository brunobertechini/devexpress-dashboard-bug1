import { Component, OnInit } from '@angular/core';
import DevExpress from '@devexpress/analytics-core';

@Component({
  selector: 'app-report-designer',
  templateUrl: './report-designer.component.html',
  styleUrls: ['./report-designer.component.css']
})
export class ReportDesignerComponent implements OnInit {

  public hostUrl = 'http://localhost:52324';
  public reportUrl = 'XtraReport';
  public allowMDI = false;
  public getDesignerModelAction = '/api/ReportDesigner/GetReportDesignerModel';

  constructor() {
    DevExpress.Analytics.Utils.ajaxSetup.ajaxSettings = {
      headers: {
        'MyHeader': 'MyValue'
      }
    };
  }

  ngOnInit() {
  }

  customizeMenuActions(evt) {
    const hiddenMenus = ['dxrd-newreport', 'dxrd-newreport-via-wizard', 'dxrd-open-report', 'dxrd-save-as', 'dxrd-exit'];
    hiddenMenus.forEach(menuId => {
        const menu = evt.args.GetById(menuId);
        if (menu) {
            menu.visible = false;
        }
    });
  }

}
