import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { ThemeColor } from '../core/types/theme-color.type';

import { BadgePosition } from './badge-position.enum';


@Component({
  selector: 'nrr-badge',
  template: '{{ content }} <ng-content></ng-content>',
  styleUrls: ['./badge.component.scss'],
  host: {
    class: 'nrr-badge',
    '[class]': 'color',
    '[class.bottom-left]': 'position === "bottom left"',
    '[class.bottom-right]': 'position === "bottom right"',
    '[class.top-left]': 'position === "top left"',
    '[class.top-right]': 'position === "top right"',
    '[class.disabled]': 'disabled',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BadgeComponent {
  @Input() color: ThemeColor;

  @Input()
  get content() { return this._content; }
  set content(v) {
    this._content = v;
    this.cdr.markForCheck();
  }
  private _content: string;

  get disabled() { return this._disabled; }
  set disabled(v) {
    this._disabled = coerceBooleanProperty(v);
  }
  private _disabled?: boolean;

  get position() { return this._position; }
  set position(v) {
    this._position = v;
  }
  private _position = BadgePosition.TopRight;

  constructor(
    readonly el: ElementRef<HTMLElement>,
    readonly cdr: ChangeDetectorRef,
  ) { }
}
