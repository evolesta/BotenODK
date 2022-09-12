import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit {

  editModelForm = new FormGroup({
    DataModelId: new FormControl(this.data.id),
    name: new FormControl('', Validators.required),
    cocoKey: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    enabled: new FormControl(true, Validators.required),
  });

  cocokeys: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient,
    private http: HttpServiceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.readCocoKeys();
    this.getModel();
  }

  getModel(): void {
    this.http.get("/DataModels/" + this.data.id).subscribe(resp => {
      const response:any = resp.body;
      this.editModelForm.patchValue(response);
    });
  }

  readCocoKeys(): void {
    this.httpClient.get('assets/cocokeys.txt', {responseType: 'text'})
      .subscribe(data => {
        this.cocokeys = data.split(/\r?\n/);
      });
  }

  editNewModel(): void {
    this.http.put("/DataModels/" + this.data.id, this.editModelForm.value).subscribe(resp => {
      this.snackbar.open("Datamodel succesvol gewijzigd.", "", {
        duration: 4000
      });

      this.dialog.closeAll();
    });
  }

}
