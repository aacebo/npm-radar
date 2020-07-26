import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrr-list-item-subtitle',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./list-item-subtitle.component.scss'],
  host: { class: 'nrr-list-item-subtitle' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemSubtitleComponent { }
