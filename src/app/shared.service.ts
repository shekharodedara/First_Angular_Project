import { delay, Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  username: string = JSON.parse(localStorage.getItem('userName')!);
  logIn: boolean = false;
  home:boolean = true;

  constructor(private http: HttpClient, public router: Router) { }

  getUserData() {
    let apiurl = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(apiurl);
  }

  getProduct() {
    // let api =  'https://fakestoreapi.com/products';
    let api = 'https://dummyjson.com/products';
    return this.http.get(api);
  }

  login(user: string, pass: string): Observable<boolean> {

    let ls = JSON.parse(localStorage.getItem(user)!);
    if (pass === ls) {
      localStorage.setItem('logIn', JSON.stringify(true));
      this.logIn = true;
          setTimeout(() => {
            this.home = true;
          }, 1100);
      // this.logIn = pass == JSON.parse(localStorage.getItem(user) as any);
      // localStorage.setItem('logIn', this.logIn ? "true" : "false"); 
    }
    return of(this.logIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  logout(): void {
    this.logIn = false;
    localStorage.removeItem('logIn');
  }
}
