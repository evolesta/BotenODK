import { Component, OnInit } from '@angular/core';
import { BarchartComponent } from '../barchart/barchart.component';
import { chartData } from '../basechart';

@Component({
  selector: 'app-example-chart',
  templateUrl: './example-chart.component.html',
  styleUrls: ['./example-chart.component.css']
})
export class ExampleChartComponent {

  public chartData: chartData = {
    labels: ['Appels', 'Peren', 'Druiven', 'Bananen'],
    datasets: [{
      data: [12, 24, 8, 74],
      label: 'Fruit'
    }], 
    chartType: 'bar',
    options: {
      yAmountSteps: 10,
      height: 600
    }
  }

  public chartData2: chartData = {
    labels: ['Broccoli', 'Bloemkool', 'Aardappelen', 'Boontjes', 'Prei', 'Paprika', 'Uien'],
    datasets: [{
      data: [114, 13, 8, 74, 50, 11, 99],
      label: 'Groenten'
    },
    {
      data: [70, 111, 39, 44, 95, 77, 101],
      label: 'Groenten 2'
    }], 
    chartType: 'bar',
    options: {
      yAmountSteps: 15
    }
  }

  constructor() { }


}
