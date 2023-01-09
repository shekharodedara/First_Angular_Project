import { Emp } from './emp.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  toggle = false;

  constructor(public emp: Emp) { }

  ngOnInit(): void { }

  addEmployee() {
    this.emp.btn = 'Add Employee';
  }
}
