import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NgxTourGuideService } from '@shipbit/ngx-tour-guide';

interface WorkflowItem {
  image: string;
  title: string;
}

@Component({
  selector: 'demo-tour-template',
  templateUrl: 'demo-tour-template.component.html',
})
export class DempTourTemplateComponent {
  @ViewChild('customTourStop') customTourStop: TemplateRef<unknown>;

  constructor(private tourGuideService: NgxTourGuideService) {}

  public startTour(model: WorkflowItem) {
    this.tourGuideService.start({
      stops: [
        {
          element: ' button[submit] ',
          title: 'Here you can submit',
          content: model,
          contentTemplate: this.customTourStop,
        },
      ],
    });
  }
}
