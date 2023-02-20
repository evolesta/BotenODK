import { Component, OnInit, Input, HostListener } from '@angular/core';
import { chartData, IBaseChart } from '../basechart';
import { Basechart } from '../basechart/basechart.component';

@Component({
  selector: 'app-emptychart',
  templateUrl: './emptychart.component.html',
  styleUrls: ['./emptychart.component.css']
})
export class EmptychartComponent implements IBaseChart, OnInit {

  @Input('chartData') chartData: chartData;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.baseChart.calculateWH(document.getElementById('emptyChart').clientWidth);
    window.location.reload();
  }

  public baseChart: Basechart;

  constructor() {}

  ngOnInit(): void {
    this.getBasechart();
    this.calculateYaxis();
  }

  ngAfterViewInit(): void {
    this.baseChart.calculateWH(document.getElementById('emptyChart').clientWidth);
  }

  getBasechart(): void {
    this.baseChart = Basechart.getInstance();
    this.baseChart.setChartdata(this.chartData);
  }

  drawChart(): void {
    this.ngOnInit();
  }

  setChartdata(chartData: chartData): void {
    this.chartData = chartData;
  }

  calculateYaxis(): void {
    // generate the y axis on steps of 10
    var currentStep = 10;

    for (let i = 0; i < 10; i++) {
      this.baseChart.yAxis[i] = currentStep;
      currentStep += 10;
    }

    this.baseChart.yMaxValue = 100;
  }

}
