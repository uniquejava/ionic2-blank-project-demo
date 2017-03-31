import {Directive, ElementRef, Renderer} from '@angular/core';

/*
 Generated class for the MyDirective directive.

 See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 for more info on Angular 2 Directives.
 */
@Directive({
  selector: '[my-directive]' // Attribute selector
})
export class MyDirective{

  constructor(private el: ElementRef, private renderer: Renderer) {
    console.log('Hello MyDirective Directive');
  }

  ngOnInit() {
    this.renderer.setElementStyle(this.el.nativeElement, 'color', 'red');
  }
}
