import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpServiceService,
    private snackbar: MatSnackBar) { }

  deleteUser(): void {
    this.http.delete('/Users/' + this.data.id).subscribe(resp => {
      this.snackbar.open("Gebruiker succesvol verwijderd.", '', {
        duration: 4000
      });
    });
  }

}
