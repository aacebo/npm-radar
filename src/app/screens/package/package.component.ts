import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

import { SearchService } from '../../resources/search';
import { PackageService, IPackageData } from '../../resources/package';

import { GraphComponent } from '../../features/graph';
import { SidenavState } from '../../ui/sidenav';

@Component({
  selector: 'nrr-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss'],
  host: { class: 'nrr-package nrr-screen' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageComponent implements OnInit {
  @ViewChild(GraphComponent)
  private readonly _graph?: GraphComponent;

  menu = false;
  zoom = 0.6;

  constructor(
    readonly searchService: SearchService,
    readonly packageService: PackageService,
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

  center() {
    this._graph?.center();
  }

  async onNodeSelect(e: IPackageData) {
    const version = await this.packageService.version$.pipe(take(1)).toPromise();
    this.packageService.findOne(e.name, version);
  }

  onSidenavStateChange(e: SidenavState) {
    if (e === SidenavState.Closed || e === SidenavState.Opened) {
      setTimeout(() => this._graph?.center(), 200);
    }
  }
}
