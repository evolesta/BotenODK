import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BarchartComponent } from '../barchart/barchart.component';
import { Chart, chartData } from '../basechart';

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
    switch (this.chartData.chartType) {
      // wanneer er sprake is van een bar chart (st)
      case 'bar':
        const strategy = new Chart(new BarchartComponent);
        strategy.setChartdata(this.chartData);
        strategy.drawChart();
        break;
    }
  }

  ngAfterViewInit() {
    switch (this.chartData.chartType) {
      case 'bar':
        //this.chart.createComponent(BarchartComponent);

        break;
    }

    this.cdRef.detectChanges();
  }

}
