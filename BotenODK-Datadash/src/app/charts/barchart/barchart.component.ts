import { Component, HostListener, Input, OnInit } from '@angular/core';
import { chartData, IBaseChart } from '../basechart';
import { Basechart } from '../basechart/basechart.component';

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
    this.baseChart.calculateWH(document.getElementById('barChart').clientWidth);
    window.location.reload();
  }

  public baseChart: Basechart;

  // dialog public variables
  public showDialogFlag: boolean;
  public currentDialogDataset: any;
  public iteration: number;
  public dialogY: number = 0;
  public dialogX: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.getBasechart();
    this.baseChart.calculateYaxis();
    this.baseChart.calculateXaxis();
  }

  ngAfterViewInit(): void {
    this.baseChart.calculateWH(document.getElementById('barChart').clientWidth);
    this.prepareBarWidth();
  }

  setChartdata(chartData: chartData): void {
    this.chartData = chartData;
  }

  // verkrijg het singleton object
  getBasechart(): void {
    this.baseChart = Basechart.getInstance();
    this.baseChart.setChartdata(this.chartData);
  }

  drawChart(): void {
    this.ngOnInit();
  }

  prepareBarWidth(): void {
    // bereken hoeveel staven er per label getekend moeten worden
    this.baseChart.amountDatasets = this.chartData.datasets.length; 
    this.baseChart.distanceXaxisPixels = this.baseChart.chartWidth / this.baseChart.xAxisSteps;
    this.baseChart.barWidth = (this.baseChart.distanceXaxisPixels / this.baseChart.amountDatasets) - 10;
  }

  showDialog(event: MouseEvent, dataset: object, iteration: number): void {
    this.showDialogFlag = true;
    this.currentDialogDataset = dataset;
    this.iteration = iteration;
    this.dialogX = event.clientX;
    this.dialogY = event.clientY;
  }

  hideDialog(): void {
    this.showDialogFlag = false;
  }
}
