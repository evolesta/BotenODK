import { Component, HostListener, Input, OnInit } from '@angular/core';
import { chartData, IBaseChart } from '../basechart';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements IBaseChart, OnInit {

  @Input('chartData') chartData: chartData;
  // herbereken de breedte in pixels na een resize event
  @HostListener("window:resize", ['$event'])
  onResize() {
    this.calculateWH();
    this.calculateBarWidth();
  }

  public yAxis: number[] = [];
  public yAxisSteps: number;
  public xAxisSteps: number;
  public chartWidth: number = 0;
  public chartHeight: number = 0;
  public amountDatasets: number = 0;
  public yMaxValue:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.calculateYaxis();
    this.calculateXaxis();
  }

  ngAfterViewInit(): void {
    this.calculateWH();
    this.calculateBarWidth();
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
    this.chartWidth = document.getElementById('barChart').clientWidth;
    this.chartHeight = document.getElementById('barChart').clientHeight;
  }

  calculateBarWidth(): void {
    // bereken hoeveel staven er per label getekend moeten worden
    this.amountDatasets = this.chartData.datasets.length; 
  }
}
