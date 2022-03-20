import { Component } from '@angular/core';
import { NgxTourGuideService, TourGuide } from '@shipbit/ngx-tour-guide';

@Component({
  selector: 'demo-tour',
  templateUrl: 'demo-tour.component.html',
})
export class DemoTourComponent {
  private tour: TourGuide = {
    stops: [
      {
        element: '.toolbar',
        title: 'Toolbar',
        content: 'You can access the toolbar from anywhere in the app',
      },
      {
        element: '.content',
        title: 'Your cart',
        content: 'Here you can see and edit the items currently in your cart',
      },
      {
        element: '.item',
        title: 'Item in your cart',
        content:
          'You can modify each item in your cart by amount or deleting it.',
      },
    ],
  };

  constructor(tourGuideService: NgxTourGuideService) {
    tourGuideService.register(this.tour, 'demo');
  }
}
