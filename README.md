![NgxTourGuide](https://avatars.githubusercontent.com/u/89642383?s=200&v=4)

# NgxTourGuide

Angular module providing a framework for creating guided tours in your application.

This module emphasises on defining multiple tours throughout your application.

## Demo

[Demo page](https://shipbit.github.io/ngx-tour-guide/)

## Installation

### yarn

```bash
yarn add @shipbit/ngx-tour-guide
```

### npm

```bash
npm i --save @shipbit/ngx-tour-guide
```

### Angular CDK

The package is dependant on [Angular CDK overlay](https://material.angular.io/cdk/overlay/overview) make sure to inlcude the prebuilt css if you are not already using angular material themes.

The package uses [Angular animations](https://angular.io/guide/animations) for disabling these (e.g. testing) import the [NoopAnimationsModule](https://angular.io/api/platform-browser/animations/NoopAnimationsModule)

## Usage

### Simple setup

1. Add the module and either BrowserAnimationsModule or NoopAnimationsModule

```ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideTourGuide } from '@shipbit/ngx-tour-guide';
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideTourGuide(),
    ...
  ]
}
```

2. Add the shipbit-ngx-tour-guide to your app root

_app.component.html_

```html
<shipbit-ngx-tour-guide> </shipbit-ngx-tour-guide>
```

3. Start your tour

```ts
import { Component } from "@angular/core";
import { NgxTourGuideService } from "@shipbit/ngx-tour-guide";

@Component({
  selector: "showcase-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "showcase";

  constructor(tourGuideService: NgxTourGuideService) {
    tourGuideService.start({
      stops: [
        {
          element: ".toolbar",
          title: "This is a Toolbar!",
          content: "This is the default toolbar created with Angular CLI",
        },
        {
          element: ".content",
          title: "This is the Content!",
          content: "This is the default content created with Angular CLI",
        },
        {
          element: ".card-container",
          title: "Find resources here",
          content:
            "These are resources helping you to get started with angular development.",
        },
      ],
    });
  }
}
```

### Register tours for later use

_register a tour_

```ts
    const tour: TourGuide =  {
        ...
    }

    tourGuideService.register(tour, 'HowToUpgradeTour');
```

_and start it any time_

```ts
tourGuideService.start("HowToUpgradeTour");
```

### Use Templates for content

_component.html_

```html
<ng-template #customTourStop let-content>
  <div>
    <img [src]="content.image" />
    <p>...</p>
  </div>
</ng-template>
```

_component.ts_

```ts
@ViewChild('customTourStop') customTourStop: TemplateRef<unknown>

...

public startTour(model: WorkflowItem){
    tourGuideService.start({
        stops: [
            {
            element: " button[submit] ",
            title: "Here you can submit",
            content: model,
            contentTemplate: this.customTourStop,
            },
        ],
    });
}
```

### Use html content (make sure to sanitize)

_component.ts_

```ts
public startTour(model: WorkflowItem){
    tourGuideService.start({
        stops: [
            {
            element: "#detailArea",
            title: "This is the detail area",
            content: "This is <strong>html</strong> for templateless text styling.<br> Make sure to sanitize your html if it originates from <em>untrusted sources</em>",
            },
        ],
    });
}
```

### Customize Actions

YOu can provide content for any action button, in this case material icons

```html
<shipbit-ngx-tour-guide>
  <span class="material-icons md-18" ngxTourGuidePreviousContent
    >arrow_back</span
  >
  <span class="material-icons md-18" ngxTourGuideNextContent
    >arrow_forward</span
  >
  <span class="material-icons md-18" ngxTourGuideFinishContent>check</span>
  <span class="material-icons md-18" ngxTourGuideSkipContent>close</span>
</shipbit-ngx-tour-guide>
```

You can configure actions for each tour

```ts
const tourGuide: TourGuide = {
    stops:[...]
    actions: {
        finishTour: {
          label: 'Abschließen',
          onExecute: (stop, action) => {
            if (someReason) {
              action.cancel = true;
            }
          },
        },
        previousStop: { label: 'Zurück' },
        nextStop: { label: 'Weiter' },
        skipTour: { hidden: true },
      }
}
```

### Customize Stops

You can also use user interactions as actions

```ts
const tourGuide: TourGuide = {
  stops: [
    {
      contentTemplate: openMenuTemplate,
      element: ".menu-open-button",
      title: "This is the main menu",
      action: {
        replacesNextOrFinish: true,
        event: "click",
        delay: 200,
      },
    },
    {
      content: 'You can navigate to any menu page by clicking the item'
      element: ".menu-list",
      title: "Menu entries",
      action: {
        replacesNextOrFinish: true,
        event: "mouseenter",
        delay: 500,
      },
    },
  ],
};
```

## Styling

The base comes without any color information besides the overlay background.

### css variables

These variables can be used to configure the overlay

| variable                                     | default                   | description                                             |
| -------------------------------------------- | ------------------------- | ------------------------------------------------------- |
| --ngx-tour-guid\_\_z-index                   | 1000                      | The zindex the tour guide overlay will have in your app |
| --ngx-tour-guide\_\_overlay-backdrop-filter  | blur(200px)               | The filter the overlay uses on the background           |
| --ngx-tour-guide\_\_overlay-background-color | rgba(255, 255, 255, 0.15) | The color of the overlay                                |

#### css classes

These classes can be used to directly style the corresponding element
| selector | description |
|---|---|
|.tour-guide-container| targets the container of the skip button (if used) as well as every stop message |
|.tour-guide--skip|targets the container of the skip button specificly|
|.tour-guide--overlay|targets the overlay over your app|
|.tour-guide-stop| targets the layout of a stop: grid layout |
|.tour-guide-stop.stop-title|targets the title of a stop|
|.tour-guide-stop.stop-content|targets the content of a stop|
|.tour-guide-stop.stop-counter|targets the counter of a stop|
