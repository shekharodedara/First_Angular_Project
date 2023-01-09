import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './crud.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes:Routes = [
  {
    path:'',
    component:CrudComponent
  }
]

@NgModule({
  declarations: [
    CrudComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class CrudModule { }
