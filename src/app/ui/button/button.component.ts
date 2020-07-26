import { Component, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';

import { ThemeColor } from '../core/types/theme-color.type';

const NRR_BUTTON_HOST_ATTRIBUTES = [
  'nrr-button',
  'nrr-link-button',
  'nrr-icon-button',
  'nrr-list-button',
];

@Component({
  selector: `button[nrr-button], button[nrr-icon-button],
             button[nrr-list-button], a[nrr-list-button],
             a[nrr-link-button]`,
  template: `<ng-content></ng-content>`,
  host: { '[class]': 'color' },
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() color: ThemeColor;

  private get _element() {
    return this._el.nativeElement;
  }

  constructor(private readonly _el: ElementRef<HTMLButtonElement | HTMLAnchorElement>) {
    for (const attr of NRR_BUTTON_HOST_ATTRIBUTES) {
      if (this._element.hasAttribute(attr)) {
        this._element.classList.add(attr);
      }
    }
  }
}
