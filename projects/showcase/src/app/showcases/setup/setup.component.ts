import { Component } from '@angular/core';
import { ShowcaseContainerComponent } from '../../showcase-container/showcase-container.component';

@Component({
  selector: 'showcase-setup',
  templateUrl: './setup.component.html',
  imports: [ShowcaseContainerComponent],
  standalone: true,
})
export class SetupComponent {}
