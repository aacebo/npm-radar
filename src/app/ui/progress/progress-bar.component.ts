import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { ThemeColor } from '../core/color/theme-color.type';

import { ProgressMode } from './progress-mode.enum';

@Component({
  selector: 'nrr-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  host: {
    class: 'nrr-progress-bar',
    role: 'progressbar',
    '[class]': '[mode, color]',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() mode = ProgressMode.Determinate;
  @Input() color: ThemeColor = 'primary';

  @Input()
  get total() { return this._total; }
  set total(v) {
    this._total = coerceNumberProperty(v);
  }
  private _total = 100;

  @Input()
  get value() { return this._value; }
  set value(v) {
    this._value = coerceNumberProperty(v);
  }
  private _value = 0;

  get percentage() {
    return this.mode === ProgressMode.Determinate ?
      (100 / this.total) * this.value :
      (100 / this._indeterminate.total) * this._indeterminate.value;
  }

  private readonly _indeterminate = {
    value: 25,
    total: 100,
  };
}
