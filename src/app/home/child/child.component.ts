import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  message = 'Child: "This Message is from child component using @ViewChild."';
  msgFromParent: string;
  @Input() child: string;
  @Output() emitter = new EventEmitter; //<string>();

  constructor() { }
  ngOnInit(): void { }

  emitEvent(val: string) {
    this.emitter.emit(val);
  }
}
