import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
];

@NgModule({
  declarations: [QuizComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule.forChild(routes)],
})
export class QuizModule {}
