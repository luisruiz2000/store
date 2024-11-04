import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective {
  element = inject(ElementRef);

  constructor() {}

  ngOnInit(): void {
    this.element.nativeElement.style.background = 'red';
  }
}
