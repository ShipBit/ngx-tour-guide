import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { catchError, NEVER, Observable, of, shareReplay } from 'rxjs';

@Component({
  selector: 'showcase-showcase-container',
  templateUrl: './showcase-container.component.html',
  styleUrls: ['./showcase-container.component.scss'],
})
export class ShowcaseContainerComponent implements OnChanges {
  @Input() public label: string = '';
  @Input() public file: string = '';

  public file$: Observable<string> = NEVER;

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.file) {
      this.file$ = this.http.get(this.file, { responseType: 'text' }).pipe(
        shareReplay(1),
        catchError(() => of('File not found'))
      );
    }
  }
}
