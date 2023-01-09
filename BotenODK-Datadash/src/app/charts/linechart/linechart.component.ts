import { Component, HostListener, Input, OnInit } from '@angular/core';
import { chartData, IBaseChart } from '../basechart';
import { Basechart } from '../basechart/basechart.component';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements IBaseChart, OnInit {

  @Input('chartData') chartData: chartData;
  @HostListener("window:resize", ['$event'])
  onResize() {
    this.baseChart.calculateWH(document.getElementById('lineChart').clientWidth);
    window.location.reload();
  }

  public baseChart: Basechart;

  // dialog public variables
  public showDialogFlag: boolean;
  public currentDialogDataset: any;
  public iteration: number;
  public dialogY: number = 0;
  public dialogX: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getBasechart();
    this.baseChart.calculateYaxis();
    this.baseChart.calculateXaxis();
  }

  ngAfterViewInit(): void { 
    this.baseChart.calculateWH(document.getElementById('lineChart').clientWidth);
    this.prepareLinePoints();
   }

  drawChart(): void {
    this.ngOnInit();
  }

  setChartdata(chartData: chartData): void {
    this.chartData = chartData;
  }

  getBasechart(): void {
    this.baseChart = Basechart.getInstance();
    this.baseChart.setChartdata(this.chartData);
  }

  prepareLinePoints(): void {
    // bereken hoeveel staven er per label getekend moeten worden
    this.baseChart.amountDatasets = this.chartData.datasets.length; 
    this.baseChart.distanceXaxisPixels = this.baseChart.chartWidth / this.baseChart.xAxisSteps;
  }

  showDialog(event: MouseEvent, data: object, iteration: number): void {
    this.showDialogFlag = true;
    this.iteration = iteration;
    this.currentDialogDataset = data;
    this.dialogX = event.clientX;
    this.dialogY = event.clientY;
  }

  hideDialog(): void {
    this.showDialogFlag = false;
  }

}
 