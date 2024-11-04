import {
  Component,
  Input,
  signal,
  SimpleChanges,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
})
export class CounterComponent {
  @Input({ required: true }) duration: number = 0;
  @Input({ required: true }) msg: string = '';

  counter = signal(0);
  couterRef: number | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    console.log('Constructor');
    console.log('_'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges');
    console.log('_'.repeat(10));
    console.log(changes);
    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      this.doSomething();
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    console.log('_'.repeat(10));

    if (isPlatformBrowser(this.platformId)) {
      // Verifica si está en el navegador
      this.couterRef = window.setInterval(() => {
        this.counter.update((statePrev) => statePrev + 1);
      }, 1000);
    }
  }

  doSomething() {
    console.log('change duration');
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.couterRef !== undefined) {
      // Verifica antes de limpiar
      window.clearInterval(this.couterRef);
    }
  }
}
