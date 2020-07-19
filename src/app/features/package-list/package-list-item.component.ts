import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { INpmPackage } from '../../screens/package';

@Component({
  selector: 'nrr-package-list-item',
  templateUrl: './package-list-item.component.html',
  styleUrls: ['./package-list-item.component.scss'],
  host: { class: 'nrr-package-list-item' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageListItemComponent {
  @Input() package: INpmPackage;
}
