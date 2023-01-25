import { ChildComponent } from './child/child.component';
import { Router } from '@angular/router';
import { SharedService } from './../shared.service';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  HostListener,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit, AfterViewChecked {
  toggle = false;
  toggleChild: boolean = false;
  flag = false;
  status = 'Hello World';
  days: string[];
  name = '';
  gender = '';
  ob: object;
  obsr: any;
  er = '';
  parent = 'This data is from parent component using @Input.';
  message: string = '';
  msgForChild: string =
    'Parent: this message is from parent component using @ViewChild.';
  parentArray: string[] = [];
  obsar$: Observable<any> = this.ser.getUserData();
  private mysub: Subscription;
  namesearch: string = ''
  productArray: any[] = [
    { sno: 1, name: 'mobile', price: '34000', availabilty: 'Available' },
    { sno: 2, name: 'T.V', price: '56000', availabilty: 'Not-Available' },
    { sno: 3, name: 'Leptop', price: '84000', availabilty: 'Available' }, 
    { sno: 4, name: 'mobile(samsung)', price: '64000', availabilty: 'Not-Available' }, 
    { sno: 5, name: 'Washing Machine', price: '27000', availabilty: 'Available' },
    { sno: 6, name: 'Heater', price: '4000', availabilty: 'Not-Available' }, 
    { sno: 7, name: 'A.c', price: '30000', availabilty: 'Available' }, 
    { sno: 8, name: 'frigth', price: '24000', availabilty: 'Available' }  ];

  @ViewChild('demo') demo: ElementRef;
  @ViewChild(ChildComponent) child: any;

  constructor(public ser: SharedService, private router: Router) {
    this.days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    localStorage.setItem('userName', JSON.stringify(ser.username));
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (this.child?.message) {
        this.message = this.child.message;
        this.child.msgFromParent = this.msgForChild;
      }
    }, 0);
  }

  addItem(val: string) {
    this.parentArray.push(val);
  }

  subscribe() {
    if (!this.flag) {
      this.obsr = new Observable((sub) => {
        let count = 0;
        setInterval(() => {
          sub.next(`Observable: ${count++}`);
        }, 1000);
      });
      // this.mysub = this.obsr.subscribe( (res: any)=>console.log('wont be unsubscribed',res) );
      this.mysub = this.obsr.subscribe((res: any) => {
        (<HTMLElement>document.getElementById('observ')).innerHTML +=
          res + '<br>';
        console.log(res);
      });
    }
    this.flag = true;
  }

  unsub() {
    if (this.flag) {
      this.mysub.unsubscribe();
      this.flag = false;
    }
  }

  usePipe() {
    if (this.name === '' && this.gender === '')
      this.er = 'Please enter name and gender';
    else {
      this.er = '';
      this.ob = { name: this.name, male: this.gender };
    }
  }

  change(val: string) {
    let style = this.demo.nativeElement.style;
    if (val === 'text') style.color = 'brown';
    if (val === 'bg') style.backgroundColor = 'cornflowerblue';
    if (val === 'html')
      this.demo.nativeElement.innerHTML =
        'Text has been changed, Dom manipulation successful.';
    if (val === 'font') style.font = 'bold 30px normal';
  }

  highlight(val: string) {
    (<HTMLElement>document.getElementById(val)).style.backgroundColor =
      '#E8E8E8';
    setTimeout(() => {
      (<HTMLElement>document.getElementById(val)).style.backgroundColor =
        'transparent';
    }, 3000);
  }

  // @HostListener('window:beforeunload', ['event'])
  //     doSomething(event: any) {
  //         return false;
  //     }
}
