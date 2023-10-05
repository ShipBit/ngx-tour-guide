import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export type EnterExit = (() => Observable<unknown>) | (() => unknown);

export type Direction = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'end' | 'center';
export type NumericMargin =
  | number
  | [number, number]
  | [number, number, number]
  | [number, number, number, number];

/**
 * Data of a single stop
 */
export interface TourGuideStop {
  /**
   * Can be used to target a domElement for the stop
   * reference of an element or a query selector
   */
  element?: HTMLElement | string;

  /**
   * Content of the stop to print as message or use as implict context for a ng-template
   */
  content: Observable<string> | string | any;

  /**
   * Template ref to use instead of string content
   */
  contentTemplate?: TemplateRef<any>;

  /**
   * Uses the content as inline html,
   */
  useHtml?: boolean;

  /**
   * Title of the step
   */
  title?: Observable<string> | string;

  /**
   * Margin value to adjust the element region in px
   */
  margin?: NumericMargin;

  /**
   * Css expression for max-width
   */
  maxWidth?: string;

  /**
   * Rendererd HTML code
   */
  renderedHtml?: string;

  /**
   * Callback before entering a stop via "next" or "previous"
   */
  onEnter?: EnterExit;

  /**
   * Callback before "nexting" a stop
   */
  onLeave?: EnterExit;

  /**
   * Define an action as trigger for next step
   */
  action?: {
    /**
     * If true a stop with an action won't show the next or finish button
     */
    replacesNextOrFinish?: boolean;

    /**
     * Event to trigger the next (or finish action if step is last).
     * In case of string the event is an event listened on the stops element if defined.
     * In case of an observable the step will be nexted on emit of the observable
     */
    event?: keyof HTMLElementEventMap | Observable<unknown>;

    /**
     * Execution delay of next step after trigger
     */
    delay?: number;
  };
}
