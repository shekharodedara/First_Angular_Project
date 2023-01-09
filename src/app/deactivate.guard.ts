import { SharedService } from './shared.service';
import { Injectable, Component } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';

export interface deactivateComp{
  deactivateComp: Component;
}

@Injectable({
  providedIn: 'root'
})

export class DeactivateGuard implements CanDeactivate<deactivateComp> {

  constructor(private router: Router,private ser: SharedService){ }
  canDeactivate(
    component: deactivateComp,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot):boolean {
    //   return component.canExit() ? true : false; 
    if(confirm("Are you sure! You want to leave this page.")) return true;
    else{
        localStorage.setItem('logIn',JSON.stringify('true')); 
        return false;
    }
} 
}
