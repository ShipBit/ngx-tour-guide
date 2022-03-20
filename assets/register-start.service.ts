import { Injectable } from '@angular/core';
import { NgxTourGuideService } from '@shipbit/ngx-tour-guide';

@Injectable({ providedIn: 'root' })
export class AppTourService {
  constructor(private tourGuideService: NgxTourGuideService) {}

  public StartDemoTour() {
    this.tourGuideService.start('demo');
  }
}
