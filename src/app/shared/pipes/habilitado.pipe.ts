import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'habilitado',
  standalone: true,
})
export class HabilitadoPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Habilitado' : 'Deshabilitado';
  }
}
