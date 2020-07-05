import { Directive } from '@angular/core';

@Directive({
  selector: '[nrrPrefix]',
  host: { class: 'nrr-prefix' },
})
export class PrefixDirective { }
