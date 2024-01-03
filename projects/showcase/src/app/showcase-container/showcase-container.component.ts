import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HighlightModule } from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';
import { NEVER, Observable, catchError, of, shareReplay } from 'rxjs';
@Component({
  selector: 'showcase-showcase-container',
  imports: [HighlightModule, HighlightPlusModule, AsyncPipe],
  template: `
    <h3>{{ label }}</h3>
    <pre>
      <code [highlight]="(file$ | async) || ''"> </code>
    </pre>
  `,
  styleUrl: './showcase-container.component.scss',
  standalone: true,
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
