import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

import { INpmPackageVersion } from '../../screens/package';

@Component({
  selector: 'nrr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: { class: 'nrr-footer' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() elapseTime: number;
  @Input() selectedPackages: { [id: string]: INpmPackageVersion } = { };
}
