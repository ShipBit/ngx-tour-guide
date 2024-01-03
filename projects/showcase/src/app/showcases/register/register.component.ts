import { Component } from '@angular/core';
import { ShowcaseContainerComponent } from '../../showcase-container/showcase-container.component';

@Component({
  selector: 'showcase-register',
  templateUrl: './register.component.html',
  imports: [ShowcaseContainerComponent],
  standalone: true,
})
export class RegisterComponent {}
