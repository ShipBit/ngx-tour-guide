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
import { provideHttpClient } from '@angular/common/http';

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
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(tourGuideService: NgxTourGuideService) {
    tourGuideService.register(
      {
        stops: [
          {
            title: 'Welcome to NgxTourGuide',
            content:
              'This is a little utility to enable interactive tours in angular projects',
          },
          {
            element: '.restart',
            title: 'Restart',
            content: 'You can restart the demo tour here',
          },
          {
            element: '#setupImport',
            title: 'Import ngxTourGuide',
            useHtml: true,
            content: `You need to import the Module in your root to make the service available for any Module.<br>
              This module uses @angular/animations so import NoopAnimationsModule or BrowserAnimationsModule accordingly.<br>
              <em>Make sure to call forRoot</em>.`,
          },
          {
            element: '#setupOverlay',
            title: 'Add the UI',
            content:
              'To visualize and orchestrate the tour add TourGuideComponent to your app.',
          },
          {
            element: '#setupStart',
            title: 'Start',
            content: 'Start a tour with the injected TourGuideService.',
          },
          {
            element: '#registerTour',
            title: 'Register a tour',
            content:
              'You can register tours from anywhere. This makes sense to split the code to respective modules (e.g. lazy loading).',
          },
          {
            element: '#registerStart',
            title: 'Start a registered Tour',
            content:
              'You can start a registered tour from anywhere. Make sure to prepare your appstate accordingly (e.g. opening the respective page)',
          },
          {
            element: '#inlineHtml',
            title: 'HtmlContent',
            useHtml: true,
            content: `You can use html content. Since this comes with several risks it is disabled by default and can be enabled with <strong>useHtml</strong><br>
              Make sure to sanitize html from unsave sources`,
          },
          {
            element: '#contentTemplateRef',
            title: 'Template content',
            content: `To maximize the customization capabilities use a TemplateRef.<br>
              If needed you can pass any data as content to be used in your template.`,
          },
          {
            element: '#contentTemplate',
            title: 'Angular Template',
            useHtml: true,
            content:
              'You can use <strong>stop.content</strong> as implicit template context',
          },
          {
            element: '#customActionHtml',
            title: 'Button content',
            content: 'You can provide content for any action button.',
          },
          {
            element: '#customActionTs',
            title: 'Customize actions',
            content:
              "You can configure each of the tour's actions. As well as react to its execution.",
          },
          {
            element: '#customActionReplace',
            title: 'Replace actions',
            content:
              'If you wish to proceed your current step with other means. You can replace them with any element and event.',
          },
          {
            element: '#customStops',
            title: 'Hooks',
            content:
              'Each stop provides hooks on entering or leaving it, in case you wish to alter the state of your app.',
          },
          {
            title: 'Customize css',
            useHtml: true,
            content:
              `You can fully customize css.<br>
              <strong>.tour-guide--overlay</strong> for the overlay over your app<br>
              <strong>.tour-guide--container</strong> for the content containers<br>
              <strong>.tour-guide--stop</strong> for the layout of a stop<br>
              <strong>.tour-guide--skip</strong> additonal class to differentiate the skip container if needed<br>
              <strong>.tour-guide--stop.stop-title</strong> for the stop title<br>
              <strong>.tour-guide--stop.stop-content</strong> for the stop content<br>
              <strong>.tour-guide--stop.stop-counter</strong> for the current stop ident (1/7)<br>
              `,
          },
          {
            title: 'Thank you',
            useHtml: true,
            content:
              `Thank you for having a look at this little side project.<br>
               Any feedback is welcome`,
          },

        ],
        actions: {
          previousStop: {
            label: 'back',
            buttonClasses: ['ngx-tourguide--button'],
          },
          nextStop: {
            label: 'next',
            buttonClasses: ['ngx-tourguide--button'],
          },
          finishTour: {
            label: 'finish',
            buttonClasses: ['ngx-tourguide--button'],
          },
          skipTour: {
            label: 'skip',
            buttonClasses: ['ngx-tourguide--button'],
          },
        },
      },
      'demo'
    );
  }
}
