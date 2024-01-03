import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTourGuide } from '@shipbit/ngx-tour-guide';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideTourGuide(),
    provideHttpClient(),
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
          xml: () => import('highlight.js/lib/languages/xml'),
        },
      },
    },
  ],
};
