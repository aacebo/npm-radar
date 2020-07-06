import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

import { ProgressService } from './ui/progress';

@Component({
  selector: 'nrr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'nrr-root' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(readonly progressService: ProgressService) { }
}
