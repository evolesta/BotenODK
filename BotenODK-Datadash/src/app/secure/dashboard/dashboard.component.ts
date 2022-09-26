import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  detectedDatas: any;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: { min: 10 }
    },
    plugins: {
      legend: { display: true },
      datalabels: { anchor: 'end', align: 'end' }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [ DataLabelsPlugin ];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Telling'}]
  }

  public firstDayWeek: string = '';
  public lastDayWeek: string = '';
  private amountWeeks: number = 0;

  constructor(private http: HttpServiceService) { }

  ngOnInit(): void {
    this.prepareDataWeek();
  }

  prepareDataWeek() {
    this.firstDayWeek = this.getStartOfWeek();
    this.lastDayWeek = this.getEndOfWeek();

    this.barChartData.labels = [];
    this.barChartData.datasets[0].data = [];

    // add the days of the week to the labels of the chart
    for (let i = 0; i < 7; i++) {
      const datum = new Date(this.firstDayWeek);
      datum.setDate(datum.getDate() + i);

      this.barChartData.labels?.push(datum.toLocaleDateString());
    }

    this.http.get("/DetectedDatas?startDate=" + this.firstDayWeek + "&endDate=" + this.lastDayWeek).subscribe(resp => {
      console.log(resp.body);
      this.chart?.update();
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
}
