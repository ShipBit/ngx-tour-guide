import { makeEnvironmentProviders } from '@angular/core';
import { NgxTourGuideService } from './ngx-tour-guide.service';

export const provideTourGuide = () =>
  makeEnvironmentProviders([NgxTourGuideService]);
