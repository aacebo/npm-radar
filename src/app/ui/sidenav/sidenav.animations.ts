import { trigger, style, state, transition, animate } from '@angular/animations';

export const SIDENAV_ANIMATIONS = {
  slideTransition: trigger('slideTransition', [
    state('false', style({
      transform: 'translateX({{ distance }}%)',
    }), { params: { distance: '-100' } }),
    state('true', style({
      transform: 'translateX(0)',
    })),
    transition('* => *', animate('200ms cubic-bezier(0.35, 0, 0.25, 1)')),
  ]),
};
