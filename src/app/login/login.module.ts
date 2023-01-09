import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'create-user',
    component: CreateUserComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    CreateUserComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
