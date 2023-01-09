import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<any>('http://localhost:3000/shoppingCart')
      .pipe(map((res: any) => { return res; }));
  }

  post(data: any) {
    return this.http.post<any>('http://localhost:3000/shoppingCart', data)
      .pipe(map((res: any) => { return res; }));
  }

  delete(id: number) {
    return this.http.delete<any>('http://localhost:3000/shoppingCart/' + id)
      .pipe(map((res: any) => { return res; }));
  }

  put(id: number, data: any) {
    return this.http.put<any>('http://localhost:3000/shoppingCart/' + id, data)
      .pipe(map((res: any) => { return res; }));
  }
}
