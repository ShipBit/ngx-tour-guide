import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxTourGuideComponent } from './ngx-tour-guide.component';
import { NgxTourGuideService } from './ngx-tour-guide.service';

@NgModule({
  declarations: [NgxTourGuideComponent],
  imports: [CommonModule, OverlayModule],
  exports: [NgxTourGuideComponent],
})
export class NgxTourGuideModule {
  static forRoot(): ModuleWithProviders<NgxTourGuideModule> {
    return {
      ngModule: NgxTourGuideModule,
      providers: [NgxTourGuideService],
    };
  }
}
