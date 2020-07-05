import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { FormFieldControlBase } from '../form-field-control.base';

@Component({
  selector: 'input[nrr-input], textarea[nrr-input]',
  template: ``,
  styleUrls: ['./input.component.scss'],
  host: {
    class: 'nrr-input',
    '[id]': 'id',
    '[tabIndex]': 'tabIndex',
    '[required]': 'required',
    '[autofocus]': 'autofocus',
    '[autocomplete]': 'autocomplete',
    '(input)': 'onInput()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent extends FormFieldControlBase<string> {
  onInput() { }
}
