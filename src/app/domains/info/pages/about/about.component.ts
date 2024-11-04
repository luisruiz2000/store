import { Component, signal } from '@angular/core';
import { CounterComponent } from '@shared/components/counter/counter.component';
import { HighlightDirective } from '@shared/directives/highlight.directive';
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CounterComponent, HighlightDirective, HeaderComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']  // Nota: se debe usar styleUrls en plural
})
export default class AboutComponent {
  duration = signal(1000); // Signal para la duración
  msg = signal('Hola');     // Signal para el mensaje

  // Método para manejar el cambio de duración
  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber); // Actualiza la signal de duración
  }

  // Método para manejar el cambio de mensaje
  changeMsg(event: Event) {
    const input = event.target as HTMLInputElement;
    this.msg.set(input.value); // Actualiza la signal del mensaje
  }
}
