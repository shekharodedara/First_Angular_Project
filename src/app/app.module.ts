import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModel } from './login/create-user/user-model.model';
import { SharedService } from './shared.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
// import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'employee', loadChildren: () => import('./crud-operations/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'crudWithJsonServer', loadChildren: () => import('./crud-operations/crud-with-json-server/crud-with-json-server.module').then(m => m.CrudWithJsonServerModule) },
  { path: 'shoppingCart', loadChildren: () => import('./crud-operations/shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
  { path: 'studentDetail', loadChildren: () => import('./crud-operations/student-detail/student-detail.module').then(m => m.StudentDetailModule) },
  { path: 'crud', loadChildren: () => import('./crud-operations/basic-crud/crud.module').then(m => m.CrudModule) },
  { path: 'quiz', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule) },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'reload'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatMenuModule,
    RouterModule.forRoot(routes, routerOptions)
  ],
  exports: [
    RouterModule,
    // AppRoutingModule,
  ],
  providers: [
    SharedService,
    UserModel
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
