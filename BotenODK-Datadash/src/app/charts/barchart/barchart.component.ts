import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { chartData, IBaseChart } from '../basechart';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements IBaseChart, OnInit {

  @Input('chartData') chartData: chartData;
  @ViewChild('barChart') barChart: ElementRef;
  public yAxis: number[] = [];
  public yAxisSteps: number;
  public xAxisSteps: number;
  public chartWidth: number;

  constructor() { }

  ngOnInit(): void {
    this.calculateYaxis();
    this.calculateXaxis();
  }

  ngAfterViewInit(): void {
    const chartElement = this.barChart.nativeElement;
    this.chartWidth = chartElement.offsetWidth;
    console.log(this.chartWidth);
  }

  setChartdata(chartData: chartData): void {
    this.chartData = chartData;
  }

  drawChart(): void {
    this.ngOnInit();
  }

  calculateYaxis(): void {
    // Bereken de y-as waarden aan de hand van de dataset
    // Doorloop alle datasets om de hoogste waarde te vinden
    var highestValue = 0;

    for (let i = 0; i < this.chartData.datasets.length; i++) {

      for (let x = 0; x < this.chartData.datasets[i].data.length; x++) {
        var currentValue = this.chartData.datasets[i].data[x]; // ophalen huidige waarde
        // check of de huidige waarde hoger is dan de hoogst gevonden waarde (tot nu toe)
        if (currentValue > highestValue) {
          highestValue = currentValue;
        }
      }
    }

    // hoogst gevonden waarde afronden naar boven in tientallen en stapgrootte bepalen
    const yMaxValue = Math.ceil(highestValue / 10) * 10;
    const yStepSize = yMaxValue / this.chartData.options.yAmountSteps;

    // array voor de y-as genereren
    var currentStep = 0;
    for (let i = 0; i < this.chartData.options.yAmountSteps; i++) {
      this.yAxis[i] = currentStep;
      currentStep += yStepSize;
    }
    
    this.yAxis.reverse(); // draai de getallen in de array om
    this.yAxisSteps = this.chartData.options.yAmountSteps;
  }

  calculateXaxis(): void {
    this.xAxisSteps = this.chartData.labels.length;
  }
}
