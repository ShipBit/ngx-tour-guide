import { Component } from '@angular/core';
import { NgxTourGuideService, TourGuide } from '@shipbit/ngx-tour-guide';

@Component({
  selector: 'showcase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'showcase';

  constructor(tourGuideService: NgxTourGuideService) {
    const tourGuide: TourGuide = {
      stops: [
        {
          element: '.toolbar',
          title: 'This is a Toolbar!',
          content: 'This is the default toolbar created with Angular CLI',
        },
        {
          element: '.content',
          title: 'This is the Content!',
          content: 'This is the default content created with Angular CLI',
        },
        {
          element: '.card-container',
          title: 'Find resources here',
          content:
            'These are resources helping you to get started with angular development.',
        },
      ],
    });
  }
}