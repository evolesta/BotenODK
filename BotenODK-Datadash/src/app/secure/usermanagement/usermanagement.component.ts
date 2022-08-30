import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from 'src/app/http-service.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {

  dataSource:any;
  displayedColumns: string[] = ["firstName", "lastName", "email", "username"];

  constructor(private http: HttpServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.http.get("/Users").subscribe(resp => {
      const response:any = resp.body;
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent);
  }

}