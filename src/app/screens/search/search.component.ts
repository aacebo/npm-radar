import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from './search.service';

@Component({
  selector: 'nrr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: { class: 'nrr-search nrr-screen' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  constructor(
    readonly searchService: SearchService,
    private readonly _route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const q = this._route.snapshot.queryParamMap.get('q');

    if (q) {
      this.searchService.find(q).subscribe();
    }
  }
}
