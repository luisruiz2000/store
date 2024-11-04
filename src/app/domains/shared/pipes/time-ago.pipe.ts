import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from "date-fns";

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string | Date | undefined): string {
    if (!value) return 'Fecha no disponible'; // Retorna un mensaje si `value` es `undefined`
    const date = typeof value === 'string' ? new Date(value) : value;
    const today = new Date();
    return formatDistance(date, today, { addSuffix: true });
  }
}
