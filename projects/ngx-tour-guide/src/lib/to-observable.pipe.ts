import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';

@Pipe({
  name: 'shipbitRx',
  standalone: true,
})
export class ToObservablePipe implements PipeTransform {
  transform(value: any) {
    return isObservable(value) ? value : of(value);
  }
}
