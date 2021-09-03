![NgxTourGuide](https://avatars.githubusercontent.com/u/89642383?s=200&v=4)

# NgxTourGuide

Angular module providing a framework for creating guided tours in your application.

This module emphasises on defining multiple tours throughout your application.

## Installation

### yarn

```bash
yarn add @shipbit/ngx-tour-guide
```

### npm

```bash
npm i --save @shipbit/ngx-tour-guide
```

## Usage

### Simple setup

1. Add the module and either BrowserAnimationsModule or NoopAnimationsModule

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxTourGuideModule } from "@shipbit/ngx-tour-guide";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxTourGuideModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
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
