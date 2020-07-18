import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';

import { SearchService } from '../search';

import { GraphComponent } from '../../features/graph';
import { SidenavState } from '../../ui/sidenav';

import { PackageService } from './package.service';

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
  ) { }

  ngOnInit() {
    this._route.paramMap.pipe(
      withLatestFrom(this._route.queryParamMap),
    ).subscribe(([paramMap, queryParamMap]) => {
      const name = paramMap.get('name');
      const v = queryParamMap.get('v');

      this.packageService.findOne(name, v).subscribe();
    });
  }

  toggle() {
    this.menu = !this.menu;
  }

  center() {
    this._graph?.center();
  }

  onSidenavStateChange(e: SidenavState) {
    if (e === SidenavState.Closed || e === SidenavState.Opened) {
      setTimeout(() => this._graph?.center(), 200);
    }
  }
}
