import { ProductComponent } from './product/product.component';
import { GenderPipe } from './../gender.pipe';
import { ChildComponent } from './child/child.component';
import { DeactivateGuard } from './../deactivate.guard';
import { AuthGuard } from './../auth.guard';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { AngularFormsComponent } from './angular-forms/angular-forms.component';
import { ResolverResolver } from '../resolver.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'child', component: ChildComponent
      },
    ],
    canActivate: [AuthGuard],
    canDeactivate: [DeactivateGuard],
  },
  {
    path: 'product',
    component: ProductComponent, resolve: { products: ResolverResolver },
  }
  // {
  //   path: '', component: AngularFormsComponent
  // },
];

@NgModule({
  declarations: [
    HomeComponent,
    ChildComponent,
    AngularFormsComponent,
    ProductComponent,
    GenderPipe,
    AngularFormsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DeactivateGuard,
    AuthGuard,
    ResolverResolver
  ],
  // exports:[CounterPipe]
})
export class HomeModule { }
