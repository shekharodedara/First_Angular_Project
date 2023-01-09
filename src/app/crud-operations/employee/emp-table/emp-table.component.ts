import { Emp } from './../emp.model';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.scss'],
})
export class EmpTableComponent implements OnInit, AfterViewChecked {
  lstorage: any;

  constructor(public emp: Emp, private cd: ChangeDetectorRef) {
    this.lstorage = JSON.parse(localStorage.getItem('employee')!);
  }
  
  ngAfterViewChecked(): void {
    // setTimeout(() => {
    //   this.lstorage = JSON.parse(localStorage.getItem('employee')!);
    // }, 0);
    this.lstorage = JSON.parse(localStorage.getItem('employee')!);
    this.cd.detectChanges();
  }
  ngOnInit(): void {}

  delet(j: any) {
    if (confirm('are you sure, you want to delete these item.'))
      this.lstorage.splice(j, 1);
      localStorage.setItem('employee', JSON.stringify(this.lstorage));
  }
  updat(i: any, j: any) {
    this.emp.btn = 'Update';
    this.emp.toggle = true;
    this.emp.id = j;
    this.emp.updateImage = i.image;
    this.emp.name = i.name;
    this.emp.post = i.post;
    this.emp.age = i.age;
    this.emp.salary = i.salary;
    this.emp.dateOfJoining = i.dateOfJoining;
  }
}
