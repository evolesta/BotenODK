import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-delete-feed',
  templateUrl: './delete-feed.component.html',
  styleUrls: ['./delete-feed.component.css']
})
export class DeleteFeedComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private http: HttpServiceService) { }

  DeleteFeedComponent(): void {
    this.http.delete('/LiveFeeds/' + this.data.id).subscribe(resp => {
      this.dialog.closeAll();
    });
  }

}
