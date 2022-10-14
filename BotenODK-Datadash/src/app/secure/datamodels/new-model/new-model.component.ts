import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-new-model',
  templateUrl: './new-model.component.html',
  styleUrls: ['./new-model.component.css']
})
export class NewModelComponent implements OnInit {

  newModelForm = new FormGroup({
    name: new FormControl('', Validators.required),
    COCOKey: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    enabled: new FormControl(true, Validators.required),
  });

  cocokeys: any;

  constructor(private httpClient: HttpClient,
    private http: HttpServiceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    	this.readCocoKeys();
  }

  readCocoKeys(): void {
    this.httpClient.get('assets/cocokeys.txt', {responseType: 'text'})
      .subscribe(data => {
        this.cocokeys = data.split(/\r?\n/);
      });
  }

  addNewModel(): void {
    this.http.post("/DataModels", this.newModelForm.value).subscribe(resp => {
      this.snackbar.open("Model succesvol toegevoegd.", '', {
        duration: 4000
      });

      this.dialog.closeAll();
    });
  }

}
