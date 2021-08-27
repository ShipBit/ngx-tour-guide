import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { TourGuideActionEvent, TourGuideActions } from './models/tour-guide-actions.model';
import { TourGuideStop } from './models/tour-guide-stop.model';
import { TourGuide } from './models/tour-guide.model';

/**
 * Interface to emit the internal state of the current stop
 */
interface TourProgress {
    isFirst: boolean;

    isLast: boolean;

    index: number;

    count: number;
}

/**
 * Service to start, stop and navigate tours
 */
@Injectable()
export class NgxTourGuideService {
    /**
     * Emits the current tour stop
     */
    public currentStop$: Observable<TourGuideStop | undefined>;

    /**
     * Emits the current stop's metadata
     */
    public progress$: Observable<TourProgress | undefined>;

    /**
     * Subject to control emitting of the current stop
     */
    private currentStopSubject$ = new BehaviorSubject<TourGuideStop | undefined>(undefined);

    /**
     * The currently running tour
     */
    public tourGuide?: TourGuide;

    /**
     * Subject to control emitting of the current progress
     */
    private progressSubject$ = new BehaviorSubject<TourProgress | undefined>(undefined);

    /**
     * Store of executable tours
     */
    private registry: { [key: string]: TourGuide } = {};

    constructor() {
        this.currentStop$ = this.currentStopSubject$.asObservable();
        this.progress$ = this.progressSubject$.asObservable();
    }

    /**
     * Registers a tour to enable calling it by name
     * @param tourGuide tour configuration
     * @param name name of the tour
     */
    public register(tourGuide: TourGuide, name: string) {
        this.registry[name] = tourGuide;
    }

    /**
     * Removes the handle of a tour and stops it if running
     * @param name tour name
     */
    public unregister(name: string) {
        const tourGuide = this.registry[name];

        if (tourGuide === this.tourGuide) {
            this.stop();
        }
        delete this.registry[name];
    }

    /**
     * Start a tour.
     * This will throw if another tour is currently running.
     */
    public start(tourGuide: TourGuide | string) {
        if (this.tourGuide) {
            throw new Error('Another TourGuide is already active - consider calling TourGuideService.stop.');
        }

        const tour = typeof tourGuide === 'string' ? this.registry[tourGuide] : tourGuide;

        this.tourGuide = tour;

        this.goto(0);
    }

    /**
     * Stops the current tour if one is running
     */
    public stop() {
        this.tourGuide = undefined;

        this.currentStopSubject$.next(undefined);
    }

    /**
     * Go to the tour's next stop relative to the current.
     * This method can circle to the first if current is last.
     */
    public next() {
        if (!this.tourGuide) {
            throw new Error('No active TourGuide. Use TourGuideService.start before navigating in a tour');
        }

        const currentIndex = this.getCurrentIndex();
        const nextIndex = (currentIndex + 1) % this.tourGuide.stops.length;

        this.goto(nextIndex);
    }

    /**
     * Go to the tour's previous stop relative to the current.
     * This method can circle to the last if current is first.
     */
    public previous() {
        if (!this.tourGuide) {
            throw new Error('No active TourGuide. Use TourGuideService.start before navigating in a tour');
        }

        const currentIndex = this.getCurrentIndex();
        const previousIndex = (this.tourGuide.stops.length + currentIndex - 1) % this.tourGuide.stops.length;

        this.goto(previousIndex);
    }

    /**
     * Executes previous,next,stop in the context of a TourGuideAction
     */
    public executeAction(action: keyof TourGuideActions) {
        if (!this.tourGuide || !this.currentStopSubject$.value) {
            return;
        }

        if (this.tourGuide.actions) {
            const tourAction = this.tourGuide.actions[action];

            if (tourAction?.onExecute) {
                const event: TourGuideActionEvent = {};

                tourAction.onExecute(this.currentStopSubject$.value, event);

                if (event.cancel) {
                    return;
                }
            }
        }

        switch (action) {
            case 'finishTour':
            case 'skipTour':
                this.stop();
                break;
            case 'nextStop':
                this.next();
                break;
            case 'previousStop':
                this.previous();
                break;
        }
    }

    public getCurrentProceedAction(): keyof TourGuideActions | undefined {
        if (!this.tourGuide) {
            return undefined;
        }

        const index = this.getCurrentIndex();

        return index === this.tourGuide.stops.length - 1 ? 'finishTour' : 'nextStop';
    }

    /**
     * Change the current step and emit currentStop and progress
     */
    private goto(index: number) {
        if (!this.tourGuide) {
            return;
        }

        const stops = this.tourGuide.stops;
        const nextStop = stops[index];
        const currentStop = this.currentStopSubject$.value;

        currentStop?.onLeave && currentStop.onLeave();
        nextStop?.onEnter && nextStop.onEnter();

        this.currentStopSubject$.next(nextStop);
        this.progressSubject$.next({
            isLast: index === stops.length - 1,
            isFirst: index === 0,
            index,
            count: stops.length
        });
    }

    /**
     * Returns the current stop index of the tour.
     * @returns -1 or index of current tour stop.
     */
    private getCurrentIndex() {
        const currentStop = this.currentStopSubject$.value;
        if (!currentStop || !this.tourGuide) {
            return -1;
        }

        return Math.max(this.tourGuide.stops.indexOf(currentStop), 0);
    }
}
