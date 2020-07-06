import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, debounceTime, takeUntil, distinctUntilChanged, skip } from 'rxjs/operators';

import { INpmSearchPackage } from '../../resources/search';

@Component({
  selector: 'nrr-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss'],
  host: { class: 'nrr-search-autocomplete' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchAutocompleteComponent implements OnInit, OnDestroy {
  @Input() value?: string;
  @Input() results: INpmSearchPackage[] = [];

  @Output() valueChange = new EventEmitter<string>();

  readonly control = new FormControl();
  private readonly _destroy$ = new Subject<void>();

  ngOnInit() {
    this.control.setValue(this.value || '');
    this.control.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      skip(1),
      debounceTime(500),
      takeUntil(this._destroy$),
    ).subscribe(v => this.valueChange.emit(v));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
