import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrr-list-item-description',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./list-item-description.component.scss'],
  host: { class: 'nrr-list-item-description' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemDescriptionComponent { }
