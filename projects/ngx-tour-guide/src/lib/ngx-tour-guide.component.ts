import { animate, style, transition, trigger } from '@angular/animations';
import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { fromEvent, merge, NEVER, Observable, of, Subject } from 'rxjs';
import {
    debounceTime,
    delay,
    map,
    retryWhen,
    scan,
    shareReplay,
    switchMap,
    take,
    takeUntil,
    tap
} from 'rxjs/operators';

import { NgxTourGuideService } from './ngx-tour-guide.service';

import { NumericMargin, TourGuideStop } from './models/tour-guide-stop.model';

interface ScanState {
    errorCount: number;

    error: any;
}

/**
 * Display component.
 * It is necessary that only one instance exists since the consumed service is a statefull singleton
 */
@Component({
    selector: 'shipbit-ngx-tour-guide',
    templateUrl: 'ngx-tour-guide.component.html',
    styleUrls: ['ngx-tour-guide.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('stopAnimation', [
            transition(':enter', [style({ opacity: 0 }), animate('.5s ease-out', style({ opacity: 1 }))]),
            transition('void => *', []),
            transition('* => void', []),
            transition('* <=> *', [
                style({ transform: 'scale(0,0)', opacity: 0.4 }),
                animate('.2s ease-out', style({ opacity: 1, transform: 'scale(1,1)' }))
            ])
        ])
    ]
})
export class NgxTourGuideComponent implements OnDestroy {
    /**
     * Emits a calculated style to clip the overlay around the stop's element.
     * Emits on changes of currentStop and 'viewPort'.
     */
    public clipPath$: Observable<string | undefined>;

    /**
     * Template of a stop
     */
    @ViewChild('stopTemplate', { static: true }) public stopTemplate!: TemplateRef<any>;

    /**
     * Set host class
     */
    @HostBinding('class') hostClass = 'ngx-tour-guide';

    /**
     * The cdkOverlay reference used to position the stop template
     */
    private overlayRef = this.overlay.create({
        hasBackdrop: false,
        panelClass: 'ngx-tour-guide'
    });

    /**
     * The cdkPortalRef used to update the context of the template
     */
    private portalRef!: TemplatePortal;

    /**
     * Cleanup trigger emits OnDestroy
     */
    private destroy$ = new Subject<void>();

    /**
     * Emits to stop awaiting a stop action
     */
    private cancelStopAction$ = new Subject<void>();

    constructor(
        public tourGuideService: NgxTourGuideService,
        private overlay: Overlay,
        private viewContainerRef: ViewContainerRef
    ) {
        // trigger on resize and scroll events of the window which
        const reposition$ = merge(fromEvent(window, 'scroll'), fromEvent(window, 'resize'), of(null)).pipe(
            debounceTime(32),
            switchMap(() => tourGuideService.currentStop$),
            shareReplay({ refCount: true, bufferSize: 1 })
        );

        /**
         * Emits a calculated style to clip the overlay around the stop's element.
         * Emits on changes of currentStop and 'viewPort'.
         */
        this.clipPath$ = reposition$.pipe(
            switchMap((stop) => {
                return new Observable<TourGuideStop>((subscriber) => {
                    const element = this.getElement(stop);

                    if (!element) {
                        subscriber.next(stop);
                        subscriber.complete();

                        return;
                    }

                    element.scrollIntoView();

                    subscriber.next(stop);
                });
            }),
            map((stop) => this.clipSpotlight(stop)),
            // clipSpotlight throws if the element can not be selected, retry with delay
            retryWhen((errors) =>
                errors.pipe(
                    // count errors
                    scan<ScanState, any>((acc, error) => ({ errorCount: acc.errorCount + 1, error }), {
                        errorCount: 0,
                        error: undefined
                    }),
                    // throw after threshold
                    tap((scanState) => {
                        if (scanState.errorCount > 5) {
                            throw scanState.error;
                        }
                    }),
                    delay(200)
                )
            )
        );

        // Reposition the stop on resizes/ scrolls
        reposition$.pipe(takeUntil(this.destroy$)).subscribe(() => this.overlayRef.updatePosition());

        // setTimeout to have the element resize before positioning
        this.tourGuideService.currentStop$
            .pipe(takeUntil(this.destroy$))
            .subscribe((stop) => setTimeout(() => this.openStop(stop)));
    }

    /**
     * Cleanup
     */
    public ngOnDestroy() {
        this.destroy$.next();
    }

    /**
     * Shows a specific stop in the overlay
     */
    private openStop(stop?: TourGuideStop) {
        // clear the overlay if the tour has ended (stop === null)
        if (!stop) {
            this.overlayRef.detach();

            return;
        }

        // attach the tmeplate if noty yet attached or update the template context
        if (!this.overlayRef.hasAttached()) {
            this.portalRef = new TemplatePortal(this.stopTemplate, this.viewContainerRef, { $implicit: stop });

            this.overlayRef.attach(this.portalRef);
        } else {
            this.portalRef.context.$implicit = stop;
        }

        // position the overlay
        this.overlayRef.updatePositionStrategy(this.getPosition(stop));
        this.overlayRef.updatePosition();

        // handle stop actions as proceed triggers
        this.setupStopAction(stop);
    }

    /**
     * Get a target based positioning with a center fallback
     */
    private getPosition(stop: TourGuideStop) {
        const element = this.getElement(stop);
        const offset = this.getOffset(stop.margin);

        if (element) {
            const bbox = element.getBoundingClientRect();
            const origin = {
                x: bbox.x - offset.left,
                y: bbox.y - offset.top,
                width: bbox.width + offset.left + offset.right,
                height: bbox.height + offset.top + offset.bottom
            };

            return this.overlay
                .position()
                .flexibleConnectedTo(origin)
                .withViewportMargin(16)
                .withPositions([
                    // center on top of element
                    {
                        originX: 'center',
                        originY: 'top',
                        overlayX: 'center',
                        overlayY: 'bottom',
                        panelClass: 'tour-guide__direction--bottom'
                    },
                    // center on bottom of element
                    {
                        originX: 'center',
                        originY: 'bottom',
                        overlayX: 'center',
                        overlayY: 'top',
                        panelClass: 'tour-guide__direction--top'
                    },
                    // center left of element
                    {
                        originX: 'start',
                        originY: 'center',
                        overlayX: 'end',
                        overlayY: 'center',
                        panelClass: 'tour-guide__direction--right'
                    },
                    // center right of element
                    {
                        originX: 'end',
                        originY: 'center',
                        overlayX: 'start',
                        overlayY: 'center',
                        panelClass: 'tour-guide__direction--left'
                    }
                ]);
        }

        // fallback to center
        return this.overlay.position().global().centerVertically().centerHorizontally();
    }

    /**
     * Get the stops target element if defined, evaluates respective query string
     */
    private getElement(stop?: TourGuideStop): HTMLElement | undefined {
        if (!stop?.element) {
            return undefined;
        }

        return (
            stop.element instanceof HTMLElement ? stop.element : document.querySelector(stop.element)
        ) as HTMLElement;
    }

    /**
     * The spotlight is double shadow so it has to be positioned relative to the target elements bounds
     */
    private clipSpotlight(stop: TourGuideStop, padding = 5) {
        if (!stop?.element) {
            return undefined;
        }

        const element = this.getElement(stop);
        const offset = this.getOffset(stop.margin);

        if (!element) {
            throw new Error('Invalid query selector: not found');
        }

        const bbox = element.getBoundingClientRect();
        const top = `${bbox.top - offset.top - padding}px`;
        const left = `${bbox.left - offset.left - padding}px`;
        const right = `${bbox.right + offset.right + padding}px`;
        const bottom = `${bbox.bottom + offset.bottom + padding}px`;

        const outerRect = '0 0, 100% 0, 100% 100%, 0 100%, 0 0';
        const innerRect = `${left} ${top}, ${right} ${top}, ${right} ${bottom}, ${left} ${bottom}, ${left} ${top}`;

        return `
            --clip-box: polygon(evenodd, ${outerRect},${innerRect});
        `;
    }

    /**
     * Get the defined margin values for each direction
     */
    private getOffset(margin?: NumericMargin): { top: number; right: number; bottom: number; left: number } {
        const result = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };

        if (!margin) {
            return result;
        }

        if (Array.isArray(margin)) {
            result.top = margin[0];
            result.right = margin[1];
            result.bottom = margin.length > 2 ? (margin[2] as number) : margin[0];
            result.left = margin.length > 3 ? (margin[3] as number) : margin[1];
        } else {
            result.top = margin;
            result.right = margin;
            result.bottom = margin;
            result.left = margin;
        }

        return result;
    }

    /**
     * Setup the proceed action defined in the stop
     */
    private setupStopAction(stop: TourGuideStop) {
        if (!stop.action?.event) {
            return;
        }

        const progress = this.tourGuideService.getCurrentProceedAction();
        if (!progress) {
            return;
        }

        const observable = this.getStopAction(stop);
        observable
            .pipe(take(1), delay(stop.action.delay || 0), takeUntil(this.cancelStopAction$), takeUntil(this.destroy$))
            .subscribe(() => this.tourGuideService.executeAction(progress));
    }

    private getStopAction(stop: TourGuideStop) {
        if (!stop.action?.event) {
            return NEVER;
        }

        if (typeof stop.action.event === 'string') {
            const stopElement = this.getElement(stop);
            if (!stopElement) {
                throw new Error('Stop action is defined but stop does not provide an element');
            }

            return fromEvent(stopElement, stop.action.event);
        } else {
            return stop.action.event;
        }
    }
}
