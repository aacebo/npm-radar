import { Directive } from '@angular/core';

@Directive({
  selector: '[nrrSuffix]',
  host: { class: 'nrr-suffix' },
})
export class SuffixDirective { }
