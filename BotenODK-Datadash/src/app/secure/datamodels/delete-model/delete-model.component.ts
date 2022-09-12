import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-delete-model',
  templateUrl: './delete-model.component.html',
  styleUrls: ['./delete-model.component.css']
})
export class DeleteModelComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpServiceService,
    private snackbar: MatSnackBar) { }

  deleteModel(): void {
    this.http.delete("/DataModels/" + this.data.id).subscribe(resp => {
      this.snackbar.open("Model succesvol verwijderd.", "", {
        duration: 4000
      });
    });
  }

}
