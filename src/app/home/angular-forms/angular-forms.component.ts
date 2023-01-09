import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-angular-forms',
  templateUrl: './angular-forms.component.html',
  styleUrls: ['./angular-forms.component.scss']
})
export class AngularFormsComponent implements OnInit {
  first: string = '';
  last: string = '';
  cities: string[] = ['Gandhinagar', 'Ahmedabad', 'Rajkot', 'Junagadh', 'Porbandar'];
  user = {
    first: this.first, last: this.last
  };
  userDetail = new FormGroup({
    phone: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    hobbies: new FormArray([new FormControl('', Validators.required)])
  });

  constructor() { }
  ngOnInit(): void { }

  get hobbies() {
    return this.userDetail.get('hobbies') as FormArray;
  }

  addControl() {
    this.hobbies.push(new FormControl('', Validators.required));
  }

  onSubmit(val: any) {
    this.user = { first: val.first, last: val.last };
    this.first = '';
    this.last = '';
  }

  submitData() {
    console.log(this.userDetail.value, this.userDetail);
  }

  // @HostListener('window:beforeunload', ['event'])
  // doSomething = (event: any) => {
  //   // return event.returnValue = "Are you sure you want to exit?";
  //   return false;
  // }
}
