import { Injectable, Pipe } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
@Injectable()
export class MyPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    value = value + ''; // make sure it's a string
    return value.toLowerCase();
  }
}
