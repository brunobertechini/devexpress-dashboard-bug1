using AspNetCore.RouteAnalyzer;
using Backend.Services.Dashboards;
using Backend.Services.Reports;
using DevExpress.AspNetCore;
using DevExpress.AspNetCore.Reporting;
using DevExpress.DashboardAspNetCore;
using DevExpress.DashboardCommon;
using DevExpress.DashboardWeb;
using DevExpress.DataAccess.Excel;
using DevExpress.DataAccess.Sql;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System.IO;

namespace Backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment hostingEnvironment)
        {
            Configuration = configuration;
            FileProvider = hostingEnvironment.ContentRootFileProvider;
            DashboardExportSettings.CompatibilityMode = DashboardExportCompatibilityMode.Restricted;
        }

        public IConfiguration Configuration { get; }
        public IFileProvider FileProvider { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Cors
            services.AddCors();

            // Based on DevExpress Template
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddDevExpressControls();

            // Route Analyzer
            services.AddRouteAnalyzer();

            // Mvc
            services.AddMvc()
                    .AddDefaultReportingControllers()
                    .AddDefaultDashboardController((configurator, serviceProvider) => {
                        configurator.SetConnectionStringsProvider(new DashboardConnectionStringsProvider(Configuration));

                        DashboardFileStorage dashboardFileStorage = new DashboardFileStorage(FileProvider.GetFileInfo("Data/Dashboards").PhysicalPath);
                        configurator.SetDashboardStorage(dashboardFileStorage);

                        DataSourceInMemoryStorage dataSourceStorage = new DataSourceInMemoryStorage();

                        // Registers an SQL data source.
                        DashboardSqlDataSource sqlDataSource = new DashboardSqlDataSource("SQL Data Source", "NWindConnectionString");
                        sqlDataSource.DataProcessingMode = DataProcessingMode.Client;
                        SelectQuery query = SelectQueryFluentBuilder
                            .AddTable("Categories")
                            .Join("Products", "CategoryID")
                            .SelectAllColumns()
                            .Build("Products_Categories");
                        sqlDataSource.Queries.Add(query);
                        dataSourceStorage.RegisterDataSource("sqlDataSource", sqlDataSource.SaveToXml());

                        // Registers an Object data source.
                        DashboardObjectDataSource objDataSource = new DashboardObjectDataSource("Object Data Source");
                        dataSourceStorage.RegisterDataSource("objDataSource", objDataSource.SaveToXml());

                        // Registers an Excel data source.
                        DashboardExcelDataSource excelDataSource = new DashboardExcelDataSource("Excel Data Source");
                        excelDataSource.FileName = FileProvider.GetFileInfo("Data/Sales.xlsx").PhysicalPath;
                        excelDataSource.SourceOptions = new ExcelSourceOptions(new ExcelWorksheetSettings("Sheet1"));
                        dataSourceStorage.RegisterDataSource("excelDataSource", excelDataSource.SaveToXml());

                        configurator.SetDataSourceStorage(dataSourceStorage);

                        configurator.DataLoading += (s, e) => {
                            if (e.DataSourceName == "Object Data Source")
                            {
                                e.Data = Invoices.CreateData();
                            }
                        };
                    });

            // DevExpress Reporting
            services.ConfigureReportingServices(configurator => {
                configurator.ConfigureReportDesigner(designerConfigurator => {
                    designerConfigurator.RegisterDataSourceWizardConfigFileConnectionStringsProvider();
                    designerConfigurator.EnableCustomSql();
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // DevExpress Reporting
            var reportDirectory = Path.Combine(env.ContentRootPath, "Services/Reports");
            DevExpress.XtraReports.Web.Extensions.ReportStorageWebExtension.RegisterExtensionGlobal(new ReportStorage(reportDirectory));
            DevExpress.XtraReports.Configuration.Settings.Default.UserDesignerOptions.DataBindingMode = DevExpress.XtraReports.UI.DataBindingMode.Expressions;

            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseDevExpressControls();

            app.UseCors(options =>
            {
                options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });

            app.UseMvc(routes =>
            {
                // Route Analyzer
                routes.MapRouteAnalyzer("/routes");

                // DevExpress Dashboards
                routes.MapDashboardRoute("api/dashboard");

                // Default AspNetCore Mvc
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
