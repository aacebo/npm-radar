import { Directive } from '@angular/core';

@Directive({
  selector: '[lucPrefix]',
  host: {
    class: 'nrr-prefix',
  },
})
export class PrefixDirective { }
