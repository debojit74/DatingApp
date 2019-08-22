import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input() message: string = ""

  @Output() clickHandler: EventEmitter<null> = new EventEmitter<null>()

  constructor() { }

  ngOnInit() {
  }

  removeAlert() {
    this.clickHandler.emit();
  }
}
