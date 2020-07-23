import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrr-list-item-title',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./list-item-title.component.scss'],
  host: { class: 'nrr-list-item-title' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemTitleComponent { }
