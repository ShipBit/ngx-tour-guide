import { Component } from '@angular/core';
import { ShowcaseContainerComponent } from '../../showcase-container/showcase-container.component';

@Component({
  selector: 'showcase-html-content',
  templateUrl: './html-content.component.html',
  imports: [ShowcaseContainerComponent],
  standalone: true,
})
export class HtmlContentComponent {}
