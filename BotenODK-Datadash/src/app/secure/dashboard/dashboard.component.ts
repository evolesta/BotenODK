import { Component, OnInit, ViewChild } from '@angular/core';
import { chartData } from 'src/app/charts/basechart';
import { BasechartComponent } from 'src/app/charts/basechart/basechart.component';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BasechartComponent) baseChart!: BasechartComponent;
  amountWeeks: number = 0;
  firstWeekDay: string;
  lastWeekDay: string;
  chartData: chartData = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Aantal'
    }],
    chartType: 'bar',
    options: {
      yAmountSteps: 10,
      height: 600
    }
  };
  
  constructor(private http: HttpServiceService) { }

  ngOnInit(): void {
    this.prepareDataWeek();
  }

  prepareDataWeek(): void {
    this.firstWeekDay = this.getStartOfWeek();
    this.lastWeekDay = this.getEndOfWeek();

    this.http.get('/DetectedDatas?startDate=' + this.firstWeekDay + '&endDate=' + this.lastWeekDay).subscribe(resp => {
      const data:any = resp.body;

      this.chartData.labels = [];
      this.chartData.datasets[0].data = [];

      for (let i = 0; i < 7; i++) {
        const datum = new Date(this.firstWeekDay);
        datum.setDate(datum.getDate() + i);

        this.chartData.labels?.push(datum.toLocaleDateString());
        this.chartData.datasets[0].data.push(0);

        for (let x = 0; x < Object.keys(data).length; x++) {
          const timestamp = new Date(data[x].timestamp);

          if (datum.toLocaleDateString() === timestamp.toLocaleDateString()) {
            this.chartData.datasets[0].data[i]++;
          }
        }
      }

      this.baseChart.updateChart();
    });
  }

  getStartOfWeek(): string {
    const today = new Date(); // todays date

    const firstDay = new Date(today.setDate(today.getDate() - today.getDay() + 1 + (this.amountWeeks * 7)));
    return firstDay.toLocaleDateString('en-US');
  }

  getEndOfWeek(): string {
    const today = new Date(); // todays date

    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7 + (this.amountWeeks * 7)));
    return lastDay.toLocaleDateString('en-US');
  }

  incrementAmountWeeks() {
    this.amountWeeks++;
    this.prepareDataWeek();
  }

  decrementAmountWeeks() {
    this.amountWeeks--;
    this.prepareDataWeek();
  }

  resetAmountWeeks() {
    this.amountWeeks = 0;
    this.prepareDataWeek();
  }
}
