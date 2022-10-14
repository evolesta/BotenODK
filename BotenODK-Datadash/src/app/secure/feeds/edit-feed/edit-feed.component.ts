import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-edit-feed',
  templateUrl: './edit-feed.component.html',
  styleUrls: ['./edit-feed.component.css']
})
export class EditFeedComponent implements OnInit {

  editFeedForm: FormGroup = new FormGroup({
    id: new FormControl(this.data.id),
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl(''),
    enabled: new FormControl()
  });

  constructor(private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private http: HttpServiceService,
      private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFeed();
  }

  getFeed(): void {
    this.http.get('/LiveFeeds/' + this.data.id).subscribe(resp => {
      const response:any = resp.body;
      this.editFeedForm.patchValue(response);
    });
  }

  submitFeed(): void {
    if (this.editFeedForm.status == "INVALID") {
      this.snackbar.open('Niet alle velden zijn correct', '', {
        duration: 4000
      });
    }
    else if (this.editFeedForm.status == "VALID") {
      this.http.put('/LiveFeeds/' + this.data.id, this.editFeedForm.value).subscribe(resp => {
        this.dialog.closeAll();
      });
    }
  }

}
