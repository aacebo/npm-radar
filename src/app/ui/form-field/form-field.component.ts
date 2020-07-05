import { Component, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormControlName } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nrr-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  host: {
    class: 'nrr-form-field',
    '[class.invalid]': 'errors?.length > 0',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnDestroy {
  get formControlName() { return this._formControlName; }
  set formControlName(v) {
    this._formControlName = v;

    if (v) {
      v.statusChanges.pipe(
        takeUntil(this._destroy$),
      ).subscribe(this._onStatusChange.bind(this));
      this._onStatusChange();
    }
  }
  private _formControlName: FormControlName;

  errors: string[] = [];
  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _cdr: ChangeDetectorRef) { }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _onStatusChange() {
    this.errors = this._parseErrors();
    this._cdr.markForCheck();
  }

  private _parseErrors() {
    const errors: string[] = [];

    if (this.formControlName.errors && this.formControlName.dirty) {
      for (const key in this.formControlName.errors) {
        errors.push(key === 'required' ? 'required' : this.formControlName.errors[key]);
      }
    }

    return errors;
  }
}
