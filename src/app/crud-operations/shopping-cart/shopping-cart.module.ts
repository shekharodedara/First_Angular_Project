import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartComponent
  }
];

@NgModule({
  declarations: [
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ApiService
  ]
})
export class ShoppingCartModule { }
