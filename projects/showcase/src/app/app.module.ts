import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgxTourGuideModule,
  NgxTourGuideService,
} from '@shipbit/ngx-tour-guide';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { HighlightPlusModule } from 'ngx-highlightjs/plus';

import { AppComponent } from './app.component';
import { SetupComponent } from './showcases/setup/setup.component';
import { RegisterComponent } from './showcases/register/register.component';
import { HtmlContentComponent } from './showcases/html-content/html-content.component';
import { CustomizeActionsComponent } from './showcases/customize-actions/customize-actions.component';
import { CustomizeStopsComponent } from './showcases/customize-stops/customize-stops.component';
import { ShowcaseContainerComponent } from './showcase-container/showcase-container.component';

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    RegisterComponent,
    HtmlContentComponent,
    CustomizeActionsComponent,
    CustomizeStopsComponent,
    ShowcaseContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HighlightModule,
    HighlightPlusModule,
    NgxTourGuideModule.forRoot(),
  ],
  providers: [
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
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(tourGuideService: NgxTourGuideService) {
    tourGuideService.register(
      {
        stops: [
          {
            title: 'Welcome to NgxTourGuide',
            content: 'This is a little utility to enable interactive tours in angular projects',
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
        actions: {
          previousStop: {
            label: 'Zurück',
            buttonClasses: ['ngx-tourguide--button'],
          },
          nextStop: {
            label: 'Weiter',
            buttonClasses: ['ngx-tourguide--button'],
          },
          finishTour: {
            label: 'Abschließen',
            buttonClasses: ['ngx-tourguide--button'],
          },
        },
      },
      'demo'
    );
  }
}
