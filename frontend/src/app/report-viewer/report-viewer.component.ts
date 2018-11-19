import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent implements OnInit {

  public hostUrl = 'http://localhost:52324';
  public reportUrl = 'XtraReport';
  public invokeAction = '/DXXRDV';

  constructor() { }

  ngOnInit() {
  }

}
