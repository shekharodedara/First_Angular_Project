import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CrudWithJsonServerComponent } from './crud-with-json-server.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: CrudWithJsonServerComponent
  }
]

@NgModule({
  declarations: [
    CrudWithJsonServerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [ApiService]
})
export class CrudWithJsonServerModule { }
