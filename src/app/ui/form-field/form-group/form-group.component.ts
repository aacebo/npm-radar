import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'nrr-form-group',
  template: `<ng-content select="nrr-form-field"></ng-content>`,
  styleUrls: ['./form-group.component.scss'],
  host: {
    class: 'nrr-form-group',
    '[class.row]': 'direction === "row"',
    '[class.column]': 'direction === "column"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormGroupComponent {
  @Input() direction: 'row' | 'column' = 'column';
}
