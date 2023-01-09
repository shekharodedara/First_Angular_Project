import { Emp } from './emp.model';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeComponent } from './employee.component';
import { FormsModule } from '@angular/forms';
import { EmpFormComponent } from './emp-form/emp-form.component';
import { EmpTableComponent } from './emp-table/emp-table.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
  }
];

@NgModule({
  declarations: [
    EmployeeComponent,
    EmpFormComponent,
    EmpTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Emp
  ]
})
export class EmployeeModule { }
