import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BarchartComponent } from '../barchart/barchart.component';
import { Chart, chartData } from '../basechart';
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

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

}
