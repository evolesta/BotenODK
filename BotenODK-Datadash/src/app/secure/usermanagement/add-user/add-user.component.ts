import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpServiceService } from 'src/app/http-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  adduserForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    role: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpServiceService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog) { }

  addUser(): void {
     if (this.adduserForm.status == 'VALID') {
      this.http.post('/Users', this.adduserForm.value).subscribe(resp => {
        
        this.snackbar.open("Gebruiker succesvol aangemaakt.", '', {
          duration: 4000
        });

        this.dialog.closeAll();
      });
     }
  }

}
