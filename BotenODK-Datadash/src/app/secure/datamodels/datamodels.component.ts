import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from 'src/app/http-service.service';
import { DeleteModelComponent } from './delete-model/delete-model.component';
import { EditModelComponent } from './edit-model/edit-model.component';
import { NewModelComponent } from './new-model/new-model.component';

@Component({
  selector: 'app-datamodels',
  templateUrl: './datamodels.component.html',
  styleUrls: ['./datamodels.component.css']
})
export class DatamodelsComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ["name", "cocoKey", "description", "enabled", "options"]

  constructor(private http: HttpServiceService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getModels();
  }

  getModels(): void {
    this.http.get("/DataModels").subscribe(resp => {
      const response:any = resp.body;
      this.dataSource = new MatTableDataSource(response);
    });
  }

  enableDisableModel(element: any) {
    if (element.enabled) {
      element.enabled = false;
    }
    else {
      element.enabled = true;
    }

    this.http.put("/DataModels/" + element.dataModelId, element).subscribe(resp => {
      this.getModels();
    });
  }

  openNewModelDialog(): void {
    const dialogRef = this.dialog.open(NewModelComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.getModels();
    });
  }

  editNewModelDialog(id: number): void {
    const dialogRef = this.dialog.open(EditModelComponent, {
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getModels();
    });
  }

  deleteModelDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      data: {
        id: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getModels();
    });
  }

}