import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user = "";
  pass = "";
  flag: boolean = false;
  constructor(public ser: SharedService, public router: Router) { 
    ser.home = false;
  }

  logIn(user: string, pass: string) {
    this.ser.username = user;
    this.ser.login(user, pass).subscribe((val) => {
      if (val) this.router.navigate(['/home']);
    });
  }

  warn() {
    setTimeout(() => {
      if (!localStorage.getItem('logIn')) {
        this.flag = true;
        setTimeout(() => { this.flag = false }, 2000);
      }
    }, 10);
  }

  ngOnInit(): void { }
}
