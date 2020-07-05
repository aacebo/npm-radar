import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { SearchService } from '../../resources/search';

@Component({
  selector: 'nrr-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  host: { class: 'nrr-search nrr-screen' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  constructor(private readonly _searchService: SearchService) { }

  onSearchChange(e: string) {
    this._searchService.find(e);
  }
}
