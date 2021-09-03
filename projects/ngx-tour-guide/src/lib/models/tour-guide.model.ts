import { TourGuideActions } from './tour-guide-actions.model';
import { TourGuidePlacements } from './tour-guide-placements.model';
import { TourGuideStop } from './tour-guide-stop.model';

/**
 * Assembly of a tour, this can be utilized for default configurations if that pattern is required
 */
export interface TourGuide {

    /**
     * Action configuration
     */
    actions?: TourGuideActions;

    /**
     * Ordered list of stops to visit
     */
    stops: TourGuideStop[];

    /**
     * Adjust placements of tour elements
     */
    placements?: TourGuidePlacements;

}


