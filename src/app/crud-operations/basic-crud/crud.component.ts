import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit, AfterViewChecked {
  toggle: boolean;
  submit: boolean = true;
  form: FormGroup;
  lstorage: any;
  id: any;

  constructor(public fb: FormBuilder) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
    this.lstorage = JSON.parse(localStorage.getItem('member')!);
    !this.lstorage ? localStorage.setItem('member', JSON.stringify([])) : null;
  }

  ngAfterViewChecked(): void {
    this.lstorage = JSON.parse(localStorage.getItem('member')!);
  }
  ngOnInit(): void {}

  submitData(form: any, i: any) {
    this.lstorage = JSON.parse(localStorage.getItem('member')!);
    if (this.submit) {
      this.lstorage.push(form);
    } else if (!this.submit) {
      this.lstorage[this.id] = form;
    }
    this.toggle = false;
    localStorage.setItem('member', JSON.stringify(this.lstorage));
  }

  del(i: number) {
    if (confirm('Are You sure')) {
      this.lstorage = JSON.parse(localStorage.getItem('member')!);
      this.lstorage.splice(i, 1);
      localStorage.setItem('member', JSON.stringify(this.lstorage));
    }
  }
  
  up(i: number, item: any) {
    this.id = i;
    this.toggle = true;
    this.submit = false;
    this.form.setValue(item);
  }
}

// export interface Crud{
//   name:string
//   age:number
//   email:string
//   mobile:number
// }
