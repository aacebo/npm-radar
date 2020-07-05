import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrr-error',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./error.component.scss'],
  host: { class: 'nrr-error nrr-ellipsis' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent { }
