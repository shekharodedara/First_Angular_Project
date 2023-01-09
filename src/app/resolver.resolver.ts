import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverResolver implements Resolve<any> {
  constructor(private sharedService: SharedService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log(route);
    return this.sharedService.getProduct();
  }

}
