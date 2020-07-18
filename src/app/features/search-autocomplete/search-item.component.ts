import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { INpmSearchPackage } from '../../screens/search';

@Component({
  selector: 'nrr-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss'],
  host: { class: 'nrr-search-item' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchItemComponent {
  @Input() package: INpmSearchPackage;
}
