import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { SearchService } from '../../resources/search';

@Component({
  selector: 'nrr-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  host: { class: 'nrr-package nrr-screen' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent {
  constructor(readonly searchService: SearchService) { }
}
