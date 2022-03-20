import { Component } from '@angular/core';
import { NgxTourGuideService } from '@shipbit/ngx-tour-guide';

@Component({
  selector: 'shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss'],
})
export class CartComponent {
  constructor(tourGuideService: NgxTourGuideService) {
    tourGuideService.start({
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
    });
  }
}
