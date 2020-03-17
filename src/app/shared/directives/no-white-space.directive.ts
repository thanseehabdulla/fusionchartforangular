import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[noWhiteSpace]'
})
export class NoWhiteSpaceDirective {
  constructor(private elemetRef: ElementRef, private formControl: NgControl) {}

  @HostListener('input', ['$event']) onEvent($event) {
    this.formControl.control.setValue(this.elemetRef.nativeElement.value.trim());
  }

}
