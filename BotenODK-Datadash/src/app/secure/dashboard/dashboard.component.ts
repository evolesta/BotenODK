import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/http-service.service';

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
