import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FusionChartsModule } from "angular-fusioncharts";

// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FusionChartsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

