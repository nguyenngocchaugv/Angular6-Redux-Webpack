import { trigger, group, animate, transition, style, query,  } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
    transition('* <=> *', [
        /* order */
        /* 1 */ query(':enter, :leave', style({ position: 'fixed', width: '100%' })
          , { optional: true }),
        /* 2 */ group([  // block executes in parallel
          query(':enter', [
            style({ opacity: 0 }),
            animate('0.5s', style({ opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: 1 }),
            animate('0.3s', style({ opacity: 0 }))
          ], { optional: true }),
        ])
      ])
  ]);
  