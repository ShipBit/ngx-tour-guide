import { TourGuide } from "@shipbit/ngx-tour-guide";
import { hasBeenCreated } from 'demo-util';

const tourGuide: TourGuide = {
  stops:[],
  actions: {
      finishTour: {
        label: 'Abschließen',
        onExecute: (stop, action) => {
          if (!hasBeenCreated()) {
            action.cancel = true;
          }
        },
      },
      previousStop: { label: 'Zurück' },
      nextStop: { label: 'Weiter' },
      skipTour: { hidden: true },
    }
}
