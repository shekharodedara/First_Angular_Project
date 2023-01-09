import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailComponent } from './student-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
  {
    path: '',
    component: StudentDetailComponent,
  },
];

@NgModule({
  declarations: [StudentDetailComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  // exports: [
  //   MatTableModule,
  //   MatSortModule,
  //   MatPaginatorModule
  // ]
})
export class StudentDetailModule { }
