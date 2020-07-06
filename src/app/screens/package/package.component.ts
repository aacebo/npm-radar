import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../resources/search';

@Component({
  selector: 'nrr-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  host: { class: 'nrr-package nrr-screen' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent implements OnInit {
  menu = false;

  constructor(
    readonly searchService: SearchService,
    private readonly _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.menu = this._route.snapshot.queryParamMap.has('q');
  }
}
