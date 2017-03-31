import { Component } from '@angular/core';

/*
  Generated class for the My component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'my',
  templateUrl: 'my.html'
})
export class MyComponent {

  text: string;

  constructor() {
    console.log('Hello My Component');
    this.text = 'Hello World';
  }

}
