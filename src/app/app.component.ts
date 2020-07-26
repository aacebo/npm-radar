import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { SearchService } from './screens/search';

@Component({
  selector: 'nrr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'nrr-root' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(readonly searchService: SearchService) { }
}
