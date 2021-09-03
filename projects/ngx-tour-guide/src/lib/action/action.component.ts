import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  TourGuideAction,
  TourGuideActions,
} from '../models/tour-guide-actions.model';
import { NgxTourGuideService } from '../ngx-tour-guide.service';

@Component({
  selector: 'shipbit-ngx-tour-guide-action',
  templateUrl: 'action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionComponent implements OnChanges {
  public action?: TourGuideAction;
  @Input() public actionKey?: keyof TourGuideActions;

  constructor(public tourGuideService: NgxTourGuideService) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.actionKey) {
      this.updateAction();
    }
  }

  private updateAction() {
    if (!this.actionKey || !this.tourGuideService.tourGuide?.actions) {
      this.action = undefined;
      return;
    }

    this.action = this.tourGuideService.tourGuide.actions[this.actionKey];
  }
}
