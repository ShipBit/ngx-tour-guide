import { TourGuide } from '@shipbit/ngx-tour-guide';

const tour: TourGuide = {
  stops: [
    {
      element: '#detailArea',
      title: 'This is the detail area',
      useHtml: true,
      content:
        'This is <strong>html</strong> for templateless text styling.<br> Make sure to sanitize your html if it originates from <em>untrusted sources</em>',
    },
  ],
};
