import { Component } from '@angular/core';
import { NgxTourGuideService } from '@shipbit/ngx-tour-guide';

@Component({
  selector: 'showcase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'showcase';

  constructor(public tourGuideService: NgxTourGuideService) {
    this.startTour();
  }

  public startTour() {
    this.tourGuideService.start('demo');
  }
}
