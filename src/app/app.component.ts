// Root component

import { Component, NgZone } from '@angular/core';

const data2 = {
  chart: {
    caption: "Countries With Most Oil Reserves [2017-18]",
    subcaption: "In MMbbl = One Million barrels",
    xaxisname: "Country",
    yaxisname: "Reserves (MMbbl)",
    numbersuffix: "K",
    theme: "fusion"
  },
  data: [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    },
    {
      label: "Iran",
      value: "140"
    },
    {
      label: "Russia",
      value: "115"
    },
    {
      label: "UAE",
      value: "100"
    },
    {
      label: "US",
      value: "30"
    },
    {
      label: "China",
      value: "30"
    }
  ]
};

const data = {
  chart: {
    caption: "Android Distribution for our app",
    subcaption: "For all users in 2017",
    showpercentvalues: "1",
    defaultcenterlabel: "Android Distribution",
    aligncaptionwithcanvas: "0",
    captionpadding: "0",
    decimals: "1",
    plottooltext:
      "<b>$percentValue</b> of our Android users are on <b>$label</b>",
    centerlabel: "# Users: $value",
    theme: "fusion"
  },
  data: [
    {
      label: "Ice Cream Sandwich",
      value: "1000"
    },
    {
      label: "Jelly Bean",
      value: "5300"
    },
    {
      label: "Kitkat",
      value: "10500"
    },
    {
      label: "Lollipop",
      value: "18900"
    },
    {
      label: "Marshmallow",
      value: "17904"
    }
  ]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  chart2:any = false
  width = 600;
  height = 400;
  type = "doughnut2d";
  type2 = "column2d";
  dataFormat = "json";
  dataSource = data;
  dataSource2 = data2;

  constructor(private zone: NgZone){

  }

  update() {
    console.log("update")
    // Run inside angular context
    this.chart2 = true
    console.log(this.chart2)
  }

}
