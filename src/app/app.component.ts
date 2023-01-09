import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;
  title = 'First-Angular-project';
  constructor(public router: Router, public ser: SharedService) {
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationStart) {
        this.loading = true;
      }
      if (
        ev instanceof NavigationEnd ||
        ev instanceof NavigationCancel ||
        ev instanceof NavigationError
      ) {
        this.loading = false;
      }
    });
  }

  logOut() {
    this.ser.logout();
    this.router.navigate(['/']);
  }
}


