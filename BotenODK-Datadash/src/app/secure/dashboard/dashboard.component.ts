import { DatePipe } from '@angular/common';
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
    datasets: []
  }

  constructor(private http: HttpServiceService) { }

  ngOnInit(): void {
    this.getDatas();
    //this.transformAmountEachDay();
  }

  getDatas(): void {
    this.http.get("/DetectedDatas").subscribe(resp => {
      this.detectedDatas = resp.body;
      const amountOfDatas = Object.keys(this.detectedDatas).length;

      for (let i = 0; i < amountOfDatas; i++)
      {
        const date = new Date(this.detectedDatas[i].timestamp);
        const datepipe = new DatePipe('en-US');
        this.detectedDatas[i].timestamp = datepipe.transform(date, "dd-MM-YYYY");
      }
      console.log(this.detectedDatas)
    });
  }

  transformAmountEachDay(): void {
    const amountOfDatas = Object.keys(this.detectedDatas).length;
    let indexDays: number = 0;
    let addedDates: {[key: string]: string} = {};

    // iterate trough dataset from database
    for (let i = 0; i < amountOfDatas; i++) {

      // check if current date already has been processed and exists in the array
      if (!addedDates.(this.detectedDatas[i].timestamp)) {
        // date does not exist - add to dataset
        this.barChartData.labels?.push(this.detectedDatas[i].timestamp);
        this.barChartData.datasets[0].data.push(1);

        // increment temp data
        addedDates.push(this.detectedDatas[i].timestamp);
      }
      else {
        // date has already been added to the chart - increment number
      }
    }
  }
}
