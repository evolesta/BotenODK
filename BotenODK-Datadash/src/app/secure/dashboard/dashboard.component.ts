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
  
  constructor(private http: HttpServiceService) { }

  ngOnInit(): void {
    
  }
}
