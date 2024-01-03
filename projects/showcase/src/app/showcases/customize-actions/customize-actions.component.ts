import { Component } from '@angular/core';
import { ShowcaseContainerComponent } from '../../showcase-container/showcase-container.component';

@Component({
  imports: [ShowcaseContainerComponent],
  standalone: true,
  selector: 'showcase-customize-actions',
  templateUrl: './customize-actions.component.html',
})
export class CustomizeActionsComponent {}
