import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom, distinctUntilChanged } from 'rxjs/operators';

import { GraphComponent, INodeData } from '../../features/graph';

import { SearchService } from '../search';

import { PackageService } from './package.service';
import { IMenus } from './menus.interface';
import { INpmPackage } from './models';

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

  zoom = 0.6;
  readonly menus: IMenus = {
    search: false,
    menu: false,
  };

  constructor(
    readonly searchService: SearchService,
    readonly packageService: PackageService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  ngOnInit() {
    this._route.paramMap.pipe(
      distinctUntilChanged(),
      withLatestFrom(this._route.queryParamMap),
    ).subscribe(([paramMap, queryParamMap]) => {
      const name = paramMap.get('name');
      const v = queryParamMap.get('v');
      this.menus.search = false;

      this.packageService.findOne(name, v).subscribe();
    });
  }

  toggle(key: keyof IMenus) {
    this.menus[key] = !this.menus[key];
  }

  center() {
    this._graph?.center();
  }

  onNodeSelect(e: INodeData) {
    this._router.navigateByUrl(`${encodeURIComponent(e.name)}?v=${e.version}`);
  }

  onPackageSelect(e: INpmPackage) {
    this._graph?.highlight(e.name);
    this.menus.menu = false;
  }
}
