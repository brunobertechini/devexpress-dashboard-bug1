import { Component, OnInit, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DashboardControl, ResourceManager } from 'devexpress-dashboard';

@Component({
  selector: 'app-dashboard-designer',
  templateUrl: './dashboard-designer.component.html',
  styleUrls: ['./dashboard-designer.component.css']
})
export class DashboardDesignerComponent implements OnInit, AfterViewInit {

  @ViewChild('dashboardDesigner') _dashboardDesigner: ElementRef;
  public dashboardControl: any;

  constructor() { }

  ngOnInit() {
    this.initializeDashboardDesigner('dashboard1');
  }

  ngAfterViewInit() {

  }

  initializeDashboardDesigner(dashboardId: string): void {

    // Adds required HTML resources to the DOM.
    ResourceManager.embedBundledResources();

    // Creates a new Web Dashboard control with specified settings.
    this.dashboardControl = new DashboardControl(this._dashboardDesigner.nativeElement, {

        // Configures an URL where the Web Dashboard's server-side is hosted.
        endpoint: 'http://localhost:52324/api/dashboard',
        workingMode: 'Designer', // values: "Viewer" | "Designer" | "ViewerOnly"
        encodeHtml: true,
        initialDashboardId: dashboardId,
        // height: '100%',
        initialDashboardState: null,
        loadDefaultDashboard: true,
        onDashboardBeginUpdate: function(args) { },
        onDashboardEndUpdate: function(args) { },
        onItemBeginUpdate: function(args) {  },
        onItemEndUpdate: function(args) { },
        showConfirmationOnBrowserClosing: true,
        extensions: {
            'url-state': {
                includeDashboardIdToUrl: false,
                includeDashboardStateToUrl: false,
            },
            'viewer-api': {
                onItemClick: function(args) { },
                onItemHover: function(args) { },
                onItemSelectionChanged: function(args) { },
                onItemWidgetCreated: function(args) { },
                onItemWidgetUpdating: function(args) { },
                onItemWidgetUpdated: function(args) { },
                onItemElementCustomColor: function(args) { },
                onItemVisualInteractivity: function(args) { },
                onItemMasterFilterStateChanged: function(args) { },
                onItemDrillDownStateChanged: function(args) { },
                onItemDrillUpStateChanged: function(args) { },
                onItemActionAvailabilityChanged: function(args) { }
            },
            'dashboard-parameter-dialog': {
                onDynamicLookUpValuesLoaded: function(args) { }
            },
            'data-source-wizard': {
                enableCustomSql: true
            }
        }
    });

    this.dashboardControl.render();
  }

}
