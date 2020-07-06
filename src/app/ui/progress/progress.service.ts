import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProgressService {
  readonly inProgress$ = new BehaviorSubject<number>(0);

  increment() {
    this.inProgress$.next(this.inProgress$.value + 1);
  }

  decrement() {
    this.inProgress$.next(this.inProgress$.value - 1);
  }
}
