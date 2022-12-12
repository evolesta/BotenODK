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
      yAmountSteps: 10
    }
  }

  constructor() { }


}
