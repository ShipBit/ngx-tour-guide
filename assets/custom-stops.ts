import { TourGuide } from '@shipbit/ngx-tour-guide';

const tourGuide: TourGuide = {
  stops: [
    {
      content: 'You can navigate to any menu page by clicking the item',
      element: '.menu-list',
      title: 'Menu entries',
      onEnter: () => {
        openMenu();
      },
      onLeave: () => {
        closeMenu();
      },
    },
  ],
};
