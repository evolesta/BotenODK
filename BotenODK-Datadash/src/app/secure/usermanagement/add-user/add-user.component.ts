import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    role: new FormControl('', [Validators.required, Validators.maxLength(1)])
  });

  constructor(private http: HttpServiceService) { }

  addUser(): void {
     if (this.adduserForm.status == 'INVALID') {
      console.log("error")
     }
  }

}
