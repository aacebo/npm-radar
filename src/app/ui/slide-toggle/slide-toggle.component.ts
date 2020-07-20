import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';

import { ThemeColor } from '../core/color/theme-color.type';

import { FormFieldControlBase } from '../form-field/form-field-control.base';
import { formFieldControlProvider } from '../form-field/form-field-control.provider';

@Component({
  selector: 'nrr-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  host: {
    class: 'nrr-slide-toggle',
    '[class]': 'color',
    '[class.disabled]': 'disabled',
  },
  providers: [formFieldControlProvider(SlideToggleComponent)],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SlideToggleComponent extends FormFieldControlBase<boolean> {
  @Input() color: ThemeColor = 'primary';
}
