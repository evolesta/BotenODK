import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {}
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

  public selectedView: string = 'week';

  // WEEK VIEW GLOBAL VARIABLES
  public firstDayWeek: string = '';
  public lastDayWeek: string = '';
  private amountWeeks: number = 0;

  // YEAR VIEW GLOBAL VARIABLES
  public firstYearDay: string = '';
  public lastYearDay: string = '';
  private amountYears: number = 0;
  private months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

  constructor(private http: HttpServiceService) { }

  ngOnInit(): void {
    this.prepareSelectedView();
  }

  // GLOBAL FUNCTIONS

  prepareSelectedView(): void {
    switch (this.selectedView) {
      case 'week':
        this.prepareDataWeek();
        break;

      case 'year':
        this.prepareDataMonth();
        break;
    }
  }

  changeView(view: string): void {
    this.selectedView = view; // update view
    this.prepareSelectedView();
  }

  resetWeekYear(): void {
    this.amountWeeks = 0;
    this.amountYears = 0;
    this.prepareSelectedView();
  }

  // WEEK VIEW FUNCTIONS

  prepareDataWeek() {
    this.firstDayWeek = this.getStartOfWeek();
    this.lastDayWeek = this.getEndOfWeek();

    this.barChartData.labels = [];
    this.barChartData.datasets[0].data = [];

    this.http.get("/DetectedDatas?startDate=" + this.firstDayWeek + "&endDate=" + this.lastDayWeek).subscribe(resp => {
      const datas:any = resp.body;
      console.log(datas);

      // add the days of the week to the labels of the chart
      for (let i = 0; i < 7; i++) {
        const datum = new Date(this.firstDayWeek);
        datum.setDate(datum.getDate() + i);

        this.barChartData.labels?.push(datum.toLocaleDateString());
        this.barChartData.datasets[0].data.push(0);

        for (let x = 0; x < Object.keys(datas).length; x++) {
          // check if the current date from the array equals with the date from the first loop
          const timestamp = new Date(datas[x].timestamp);

          if (datum.toLocaleDateString() === timestamp.toLocaleDateString()) {
            // increment counting of found objects for chart
            this.barChartData.datasets[0].data[i]++;
          }
        }
      }

      this.chart?.update(); // update the chart
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

  // MONTH VIEW FUNCTIONS

  prepareDataMonth(): void {
    this.firstYearDay = this.getStartOfYear();
    this.lastYearDay = this.getEndOfYear();

    this.barChartData.labels = [];
    this.barChartData.datasets[0].data = [];

    this.http.get("/DetectedDatas?startDate=" + this.firstYearDay + "&endDate=" + this.lastYearDay).subscribe(resp => {
      const datas:any = resp.body;

      // iterate trough all months of the year
      for (let i = 0; i < 12; i++) {
        this.barChartData.labels?.push(this.months[i]);
        this.barChartData.datasets[0].data.push(0);

        for (let x = 0; x < Object.keys(datas).length; x++) {
          // check op huidige maand
          const iMonth = new Date(datas[x].timestamp).getMonth();
          if (i === iMonth) {
            this.barChartData.datasets[0].data[i]++;
          }
        }
      }

      this.chart?.update();
    });
  }

  getStartOfYear(): string {
    const today = new Date();
    return "01/01/" + (today.getFullYear() + this.amountYears);
  }

  getEndOfYear(): string {
    const today = new Date();
    return "12/31/" + (today.getFullYear() + this.amountYears);
  }

  incrementYear(): void {
    this.amountYears++;
    this.prepareDataMonth();
  }

  decrementYear(): void {
    this.amountYears--;
    this.prepareDataMonth();
  }
}
