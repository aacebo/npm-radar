import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { NrrConstructor } from '../types/constructor.type';

export function nrrSubscribableMixin<T extends NrrConstructor<{}>>(Base: T) {
  @Component({ template: '' })
  class Subscribable extends Base implements OnDestroy {
    readonly destroy$ = new Subject<void>();

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }
  }

  return Subscribable;
}
