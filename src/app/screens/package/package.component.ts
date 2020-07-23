import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';

import { GraphComponent, INodeData, GraphService } from '../../features/graph';
import { SettingsService, ISettings } from '../../features/settings';

import { SearchService } from '../search';

import { PackageService } from './package.service';
import { IMenus } from './menus.interface';

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
    settings: false,
  };

  private _name: string;
  private _version: string;

  constructor(
    readonly searchService: SearchService,
    readonly packageService: PackageService,
    readonly settingsService: SettingsService,
    readonly graphService: GraphService,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  ngOnInit() {
    this._route.paramMap.pipe(
      withLatestFrom(this._route.queryParamMap),
    ).subscribe(([paramMap, queryParamMap]) => {
      this._name = paramMap.get('name');
      this._version = queryParamMap.get('v');
      this.menus.search = false;
      this._graph?.clear();

      this.packageService.findOne(this._name, this._version).subscribe();
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

  onListNodeSelect(e: cytoscape.NodeDefinition) {
    console.log(e);
    this.menus.menu = false;
  }

  onSettingsChange(e: ISettings) {
    this.settingsService.next(e);
    this._graph?.clear();
    this.packageService.findOne(this._name, this._version).subscribe();
  }
}
