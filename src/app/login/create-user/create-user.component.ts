import { SharedService } from './../../shared.service';
import { Router } from '@angular/router';
import { UserModel } from './user-model.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  ar: any = [];
  flag = false;
  constructor(public userModel: UserModel, public route: Router, public ser: SharedService) {
    ser.home = false;
  }
  ngOnInit(): void { }

  store() {
    if (this.userModel.user.match(/^[a-z]{2,}[a-z]$/i) &&
      this.userModel.pass.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) &&
      this.userModel.phone.match(/^[0-9]{10}$/) &&
      this.userModel.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      if (!localStorage.getItem('user')) {
        this.ar.push(this.userModel);
        localStorage.setItem('user', JSON.stringify(this.ar));
        localStorage.setItem(this.ar[0]['user'], JSON.stringify(this.ar[0]['pass']));
      }
      else {
        this.ar = localStorage.getItem('user');
        this.ar = JSON.parse(this.ar);
        this.ar.push(this.userModel);
        localStorage.setItem('user', JSON.stringify(this.ar));
        localStorage.setItem(this.ar[this.ar.length - 1]['user'], JSON.stringify(this.ar[this.ar.length - 1]['pass']));
      }
      this.route.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }
    else {
      this.flag = true;
      setTimeout(() => (this.flag = false), 2000);
    }
  }
}
