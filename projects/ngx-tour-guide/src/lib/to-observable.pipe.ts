import { Pipe, PipeTransform } from '@angular/core';
import { Observable, isObservable, of } from 'rxjs';

@Pipe({
  name: 'shipbitRx',
})
export class ToObservablePipe implements PipeTransform {
  transform(value: any) {
    return isObservable(value) ? value : of(value);
  }
}
