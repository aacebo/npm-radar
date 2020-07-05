import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { startWith, debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'nrr-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.scss'],
  host: { class: 'nrr-search-autocomplete' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchAutocompleteComponent implements OnInit, OnDestroy {
  @Input()
  get value() { return this._value; }
  set value(v) {
    this._value = v;
    this.control.setValue(v);
    this.valueChange.emit(v);
  }
  private _value?: string;

  @Output() valueChange = new EventEmitter<string>();

  readonly control = new FormControl();
  private readonly _destroy$ = new Subject<void>();

  ngOnInit() {
    this.control.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      debounceTime(500),
      takeUntil(this._destroy$),
    ).subscribe(v => console.log(v));
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
