import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';

import { ThemeColor } from '../core/types/theme-color.type';
import { ThemeSize } from '../core/types/theme-size.type';

import { ProgressMode } from './progress-mode.enum';

@Component({
  selector: 'nrr-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
  host: {
    class: 'nrr-progress-bar',
    role: 'progressbar',
    '[class]': '[mode, color, size]',
    '[class.clear]': 'clear',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() mode = ProgressMode.Determinate;
  @Input() color: ThemeColor = 'primary';
  @Input() size: ThemeSize = 'md';

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

  @Input()
  get clear() { return this._clear; }
  set clear(v) {
    this._clear = coerceBooleanProperty(v);
  }
  private _clear?: boolean;

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
