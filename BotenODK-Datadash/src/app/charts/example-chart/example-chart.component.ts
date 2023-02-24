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
      data: [0, 0, 0, 0],
      label: 'Fruit'
    }], 
    chartType: 'line',
    options: {
      yAmountSteps: 10,
      height: 600
    }
  }

  public chartData2: chartData = {
    labels: ['Broccoli', 'Bloemkool', 'Aardappelen', 'Boontjes', 'Prei', 'Paprika', 'Uien'],
    datasets: [{
      data: [114, 13, 2, 74, 50, 11, 99],
      label: 'Groenten'
    },
    {
      data: [70, 111, 39, 44, 95, 77, 101],
      label: 'Groenten 2'
    }], 
    chartType: 'line',
    options: {
      yAmountSteps: 15,
      height: 600
    }
  }

  public chartData3: chartData = {
    labels: [],
    datasets: [], 
    chartType: 'bar',
    options: {
      yAmountSteps: 15,
      height: 600
    }
  }

  constructor() { }


}
