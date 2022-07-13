import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private snackbar: MatSnackBar,
    private http: HttpServiceService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.status == "INVALID")
    {
      this.snackbar.open("Niet alle velden zijn ingevuld!", "", {
        duration: 5000
      })
    }
    else {
      const body = {
        grant_type: "password",
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      this.http.post("/token", body).subscribe(resp => {
        const response:any = resp.body;
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl("/dashboard");
      });
    }
  }

}
