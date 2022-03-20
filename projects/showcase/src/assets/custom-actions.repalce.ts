import { TourGuide } from '@shipbit/ngx-tour-guide';

const tourGuide: TourGuide = {
  stops: [
    {
      content: 'Here you find all main navigation entries',
      element: '.menu-open-button',
      title: 'This is the main menu',
      action: {
        replacesNextOrFinish: true,
        event: 'click',
        delay: 200,
      },
    },
    {
      content: 'You can navigate to any menu page by clicking the item',
      element: '.menu-list',
      title: 'Menu entries',
      action: {
        replacesNextOrFinish: true,
        event: 'mouseenter',
        delay: 500
      },
    },
  ],
};
