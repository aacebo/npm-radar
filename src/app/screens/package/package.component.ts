import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrr-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  host: { class: 'nrr-package nrr-screen' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent { }
