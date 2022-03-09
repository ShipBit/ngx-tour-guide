import { TourGuideStop } from "./tour-guide-stop.model";

/**
 * Event emitted on clicking the respective action button
 */
export interface TourGuideActionEvent {

    /**
     * Can be set to true to cancel executing the event
     */
    cancel?: boolean;

}

/**
 * Customization options for default actions
 */
export interface TourGuideAction {

    /**
     * No button for this action
     */
    hidden?: boolean;

    /**
     * Optional label for the button, can be a translationId
     */
    label?: string;

    /**
     * Optional classes that will be applied for on the button
     */
    buttonClasses?: string[];

    /**
     * Callback before the action is executed
     */
    onExecute?: (stop: TourGuideStop, e: TourGuideActionEvent) => void;

}

/**
 * Configures the default actions in the tour
 */
export interface TourGuideActions {

    skipTour?: TourGuideAction;

    nextStop?: TourGuideAction;

    previousStop?: TourGuideAction;

    finishTour?: TourGuideAction;

    exportTour?: TourGuideAction;

}
