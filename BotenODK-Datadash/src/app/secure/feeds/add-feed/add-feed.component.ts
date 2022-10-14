import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-add-feed',
  templateUrl: './add-feed.component.html',
  styleUrls: ['./add-feed.component.css']
})
export class AddFeedComponent {

  newFeedForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    description: new FormControl(''),
    enabled: new FormControl(true)
  });

  constructor(private http: HttpServiceService,
      private snackbar: MatSnackBar,
      private dialog: MatDialog) { }

  submitNewFeed(): void {
    if (this.newFeedForm.status == "INVALID") {
      this.snackbar.open("Niet alle velden zijn correct", '', {
        duration: 4000
      });
    }
    else if (this.newFeedForm.status == "VALID") {
      this.http.post("/LiveFeeds", this.newFeedForm.value).subscribe(resp => {
        this.dialog.closeAll();
      });
    }
  }

}
