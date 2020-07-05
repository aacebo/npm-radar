import { Directive } from '@angular/core';

@Directive({
  selector: '[lucSuffix]',
  host: {
    class: 'nrr-suffix',
  },
})
export class SuffixDirective { }
