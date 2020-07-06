import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

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
    private readonly _location: Location,
  ) { }

  ngOnInit() {
    this.menu = this._route.snapshot.queryParamMap.has('q');
  }

  async toggle() {
    const text = await this.searchService.text$.pipe(take(1)).toPromise();
    this.menu = !this.menu;
    this._location.replaceState(`${location.pathname}`, this.menu ? `q=${ text || '' }` : undefined);
  }
}
