import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { AheaderComponent } from './secure/aheader/aheader.component';
import { AfooterComponent } from './secure/afooter/afooter.component';
import { LogoutComponent } from './logout/logout.component';
import { UsermanagementComponent } from './secure/usermanagement/usermanagement.component';
import { AddUserComponent } from './secure/usermanagement/add-user/add-user.component';
import { DeleteUserComponent } from './secure/usermanagement/delete-user/delete-user.component';
import { DatamodelsComponent } from './secure/datamodels/datamodels.component';
import { NewModelComponent } from './secure/datamodels/new-model/new-model.component';
import { EditModelComponent } from './secure/datamodels/edit-model/edit-model.component';
import { DeleteModelComponent } from './secure/datamodels/delete-model/delete-model.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    AheaderComponent,
    AfooterComponent,
    LogoutComponent,
    UsermanagementComponent,
    AddUserComponent,
    DeleteUserComponent,
    DatamodelsComponent,
    NewModelComponent,
    EditModelComponent,
    DeleteModelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }