import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SearchService } from './screens/search';

@Component({
  selector: 'nrr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'nrr-root' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  constructor(
    readonly searchService: SearchService,
    private readonly _swUpdate: SwUpdate,
  ) { }

  ngOnInit() {
    if (this._swUpdate.isEnabled) {
      this._swUpdate.available.pipe(takeUntil(this._destroy$)).subscribe(this._onUpdateAvailable.bind(this));
      this._swUpdate.checkForUpdate();
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _onUpdateAvailable(_e: UpdateAvailableEvent) {
    this._swUpdate.activateUpdate();
  }
}
