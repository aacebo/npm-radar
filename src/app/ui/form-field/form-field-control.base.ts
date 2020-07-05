import { Optional, Input, ElementRef, ChangeDetectorRef, OnInit, Directive } from '@angular/core';
import { FormGroupDirective, ControlValueAccessor, FormControlName } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

import { FormFieldComponent } from './form-field.component';

let nextId = 0;

@Directive()
export class FormFieldControlBase<T> implements ControlValueAccessor, OnInit {
  @Input() id = `nrr-form-field--${++nextId}`;
  @Input() placeholder?: string;

  @Input()
  get tabIndex() { return this._tabIndex; }
  set tabIndex(v) {
    this._tabIndex = coerceNumberProperty(v);
    this.el.nativeElement.tabIndex = this._tabIndex;
  }
  protected _tabIndex = 0;

  @Input()
  get required() { return this._required; }
  set required(v) {
    this._required = coerceBooleanProperty(v);
  }
  protected _required = false;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(v) {
    this._disabled = coerceBooleanProperty(v);
  }
  protected _disabled = false;

  @Input()
  get autofocus() { return this._autofocus; }
  set autofocus(v) {
    this._autofocus = coerceBooleanProperty(v);
  }
  protected _autofocus = false;

  @Input()
  get autocomplete() { return this._autocomplete; }
  set autocomplete(v) {
    this._autocomplete = coerceBooleanProperty(v);
  }
  protected _autocomplete = false;

  get value() { return this._value; }
  set value(v) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }
  protected _value?: T;

  onChange: (v: any) => void = () => {};
  onTouch = () => {};

  constructor(
    readonly el: ElementRef<HTMLElement>,
    readonly cdr: ChangeDetectorRef,
    @Optional() readonly nrrFormField: FormFieldComponent,
    @Optional() readonly formGroup: FormGroupDirective,
    @Optional() readonly formControlName: FormControlName,
  ) { }

  ngOnInit() {
    this.nrrFormField.formControlName = this.formControlName;
  }

  writeValue(v: T) {
    if (v !== this.value) {
      this.value = v;
    }
  }

  registerOnChange(fn: (v: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
