import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { INpmPackage } from '../../screens/package';

@Component({
  selector: 'nrr-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
  host: { class: 'nrr-package-list' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageListComponent {
  @Input() packages: INpmPackage[] = [];

  @Output() packageSelect = new EventEmitter<INpmPackage>();

  get filtered() {
    return this.packages.filter(p => !this.control?.value || p.name.includes(this.control?.value));
  }

  readonly control = new FormControl();
}
