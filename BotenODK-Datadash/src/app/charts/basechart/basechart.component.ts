import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { delay } from 'rxjs';
import { BarchartComponent } from '../barchart/barchart.component';
import { Chart, chartData, dataset } from '../basechart';
import { EmptychartComponent } from '../emptychart/emptychart.component';
import { LinechartComponent } from '../linechart/linechart.component';

@Component({
  selector: 'chart',
  templateUrl: './basechart.component.html',
  styleUrls: ['./basechart.component.css']
})
export class BasechartComponent implements OnInit {
  
  @Input('chartData') chartData: chartData;
  @ViewChild('chart', {read: ViewContainerRef}) chart!: ViewContainerRef;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateChart();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  updateChart(): void {
    // controleren of er data is om te presenteren
    const highestValue = this.getHighestValueInDataset();

    if (highestValue === 0) {
      // presenteer een emptychart (zonder data)
      const emptyStrategy = new Chart(new EmptychartComponent);
      this.chartData.empty = true;
      emptyStrategy.setChartdata(this.chartData);
      emptyStrategy.drawChart();
    }
    else {
      this.chartData.empty = false;
      switch (this.chartData.chartType) {
        // wanneer er sprake is van een bar chart (st)
        case 'bar':
          const barStrategy = new Chart(new BarchartComponent);
          barStrategy.setChartdata(this.chartData);
          barStrategy.drawChart();
          break;
        
        case 'line':
          const lineStrategy = new Chart(new LinechartComponent);
          lineStrategy.setChartdata(this.chartData);
          lineStrategy.drawChart();
          break;
      }
    }
  }

  getHighestValueInDataset(): number {
    // zoek het hoogste getal in de data van de datasets
    let highestValue = 0;

    for (let i = 0; i < this.chartData.datasets.length; i++) {

      for (let x = 0; x < this.chartData.datasets[i].data.length; x++) {

        let currValue = this.chartData.datasets[i].data[x];
        
        if (currValue > highestValue) {
          highestValue = currValue;
        }
      }
    }
    
    return highestValue;
  }

}

// Singleton pattern voor functies/methode die in meerdere grafieken worden gebruikt
export class Basechart
{
  private static instance: Basechart;

  private chartData: chartData;

  public yAxis: number[] = [];
  public yAxisSteps: number;
  public xAxisSteps: number;
  public chartWidth: number = 0;
  public chartHeight: number = 0;
  public amountDatasets: number = 0;
  public yMaxValue: number = 0;
  public distanceXaxisPixels: number = 0;
  public barWidth: number = 0;
  public colors: string[] = ['#E57373', '#81BED9', '#00B8D4', '#00BFA5', '#00C853'];

  private constructor() {
  }

  public static getInstance(): Basechart {
    // check of object reeds bestaat
    if (!this.instance) {
      this.instance = new Basechart();
    }

    return this.instance;
  }

  setChartdata(chartData: chartData) {
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

  calculateWH(width: number): void {
    // geef de breedte in pixels terug voor de berekeningen. De breedte wordt dynamische bepaald dmv width=100%
    this.chartWidth = width;
    this.chartWidth = this.chartWidth - 50;
    this.chartHeight = this.chartData.options.height;
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