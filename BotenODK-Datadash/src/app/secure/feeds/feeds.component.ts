import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { HttpServiceService } from 'src/app/http-service.service';
import { AddFeedComponent } from './add-feed/add-feed.component';
import { DeleteFeedComponent } from './delete-feed/delete-feed.component';
import { EditFeedComponent } from './edit-feed/edit-feed.component';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['name', 'description', 'enabled', 'actions'];

  constructor(private http: HttpServiceService,
      private dialog: MatDialog,
      private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getLivefeeds();
  }

  getLivefeeds(): void {
    this.http.get('/LiveFeeds').subscribe(resp => {
      const data:any = resp.body;
      this.dataSource = new MatTableDataSource(data);
    });
  }

  invertEnabled(element: any): void {
    if (element.enabled) {
      element.enabled = false;
    }
    else {
      element.enabled = true;
    }

    this.http.put("/LiveFeeds/" + element.id, element).subscribe(resp => {
      this.getLivefeeds();
    });
  }

  addFeedDialog(): void {
    const dialogRef = this.dialog.open(AddFeedComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.snackbar.open('Nieuwe feed toegevoegd', '', {
        duration: 4000
      });
      this.getLivefeeds();
    })
  }

  editFeedDialog(id: number): void {
    const dialogRef = this.dialog.open(EditFeedComponent, {
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.snackbar.open('Feed succesvol gewijzigd', '', {
        duration: 4000
      });
      this.getLivefeeds();
    });
  }

  deleteFeedDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteFeedComponent, {
      data: {id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.snackbar.open('Feed succesvol verwijderd', '', {
        duration: 4000
      });
      this.getLivefeeds();
    });
  }

}
