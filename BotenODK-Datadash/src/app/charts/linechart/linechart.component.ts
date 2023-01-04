import { Component, HostListener, Input, OnInit } from '@angular/core';
import { chartData, IBaseChart } from '../basechart';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements IBaseChart, OnInit {

  @Input('chartData') chartData: chartData;
  @HostListener("window:resize", ['$event'])
  onResize() {
    this.calculateWH();
  }
  public yMaxValue: number = 0;
  public yAxis: number[] = [];
  public yAxisSteps: number = 0;
  public xAxisSteps: number = 0;
  public chartWidth: number = 0;
  public chartHeight: number = 0;
  public amountDatasets: number = 0;
  public distanceXaxisPixels: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.calculateYaxis();
    this.calculateXaxis();
  }

  ngAfterViewInit(): void { 
    this.calculateWH();
    this.prepareLinePoints();
   }

  drawChart(): void {
    this.ngOnInit();
  }

  setChartdata(chartData: chartData): void {
    this.chartData = chartData;
  }

  calculateYaxis(): void {
    // Bereken de y-as waarden aan de hand van de dataset
    // Doorloop alle datasets om de hoogste waarde te vinden
    var highestValue = 0;

    for (let i = 0; i < this.chartData.datasets.length; i++) {

      var datasetHighestValue = Math.max(...this.chartData.datasets[i].data);
      if (datasetHighestValue > highestValue) {
        highestValue = datasetHighestValue;
      }
    }

    // hoogst gevonden waarde afronden naar boven in tientallen en stapgrootte bepalen
    this.yMaxValue = Math.ceil(highestValue / 10) * 10;
    const yStepSize = this.yMaxValue / this.chartData.options.yAmountSteps;

    // array voor de y-as genereren
    var currentStep = yStepSize;
    for (let i = 0; i < this.chartData.options.yAmountSteps; i++) {
      this.yAxis[i] = currentStep;
      currentStep += yStepSize;
    }
    
    this.yAxis.reverse(); // draai de getallen in de array om
    this.yAxisSteps = this.chartData.options.yAmountSteps;
  }

  calculateXaxis(): void {
    // geef het aantal stappen terug aan de hand van het aantal labels
    this.xAxisSteps = this.chartData.labels.length;
  }

  calculateWH(): void {
    // geef de breedte in pixels terug voor de berekeningen. De breedte wordt dynamische bepaald dmv width=100%
    this.chartWidth = document.getElementById('lineChart').clientWidth;
    this.chartWidth = this.chartWidth - 50;
    this.chartHeight = this.chartData.options.height;
  }

  prepareLinePoints(): void {
    // bereken hoeveel staven er per label getekend moeten worden
    this.amountDatasets = this.chartData.datasets.length; 
    this.distanceXaxisPixels = this.chartWidth / this.xAxisSteps;
  }

  calculateYPixels(step: number): number {
    return this.chartHeight - ((this.chartHeight / this.yMaxValue) * step);
  }

  calculateXPixels(i: number): number {
    return (i * this.distanceXaxisPixels) + 50;
  }

  calculateBarHeight(step: number): number {
    return (this.chartHeight - 25) - this.calculateYPixels(step);
  }

}
 