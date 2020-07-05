import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrr-label',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./label.component.scss'],
  host: { class: 'nrr-label' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelComponent { }
