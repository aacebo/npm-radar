import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';

import { GraphComponent, INodeData } from '../../features/graph';

import { SearchService } from '../search';
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
    private readonly _router: Router,
  ) { }

  ngOnInit() {
    this._route.paramMap.pipe(
      withLatestFrom(this._route.queryParamMap),
    ).subscribe(([paramMap, queryParamMap]) => {
      const name = paramMap.get('name');
      const v = queryParamMap.get('v');
      this.menu = false;

      this.packageService.findOne(name, v).subscribe();
    });
  }

  toggle() {
    this.menu = !this.menu;
  }

  center() {
    this._graph?.center();
  }

  onNodeSelect(e: INodeData) {
    this._router.navigateByUrl(`${encodeURIComponent(e.name)}?v=${e.version}`);
  }
}
