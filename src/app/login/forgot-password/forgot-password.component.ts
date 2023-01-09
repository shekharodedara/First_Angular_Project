import { SharedService } from './../../shared.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email: any;
  phone: number;
  new: any;
  confirm: any;
  lstorage: any = [];
  forgot: boolean = true;

  constructor(private router: Router, public ser: SharedService) {
    ser.home = false;
    this.lstorage = JSON.parse(localStorage.getItem('user')!);
  }
  ngOnInit(): void { }

  changePassword() {
    for (let i of this.lstorage) {
      if (this.email === i.email && this.phone === i.phone) {
        console.log('email and phone matched.');
        this.forgot = false;
      }
    }
    this.forgot ? alert('Please enter valid Email and Phone') : null;
  }

  setPassword() {
    if (this.new && this.new === this.confirm) {
      for (let i of this.lstorage) {
        if (this.email === i.email && this.phone === i.phone) {
          i.password = this.new;
          localStorage.setItem('user', JSON.stringify(this.lstorage));
          localStorage.setItem(i.user, JSON.stringify(i.password));
          alert('Password Changed successfully.');
          this.router.navigateByUrl('/login');
        }
      }
    }
    else {
      alert('Password Missmatch');
    }
  }
}