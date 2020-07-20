import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ISettings } from './settings.interface';

@Component({
  selector: 'nrr-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  host: { class: 'nrr-settings' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit, OnDestroy {
  @Input() settings: ISettings;

  @Output() settingsChange = new EventEmitter<ISettings>();

  form: FormGroup;
  private readonly _destroy$ = new Subject<void>();

  constructor(private readonly _fb: FormBuilder) { }

  ngOnInit() {
    this.form = this._fb.group({
      weightBySize: this._fb.control(this.settings.weightBySize),
    });

    this.form.valueChanges.pipe(takeUntil(this._destroy$)).subscribe(v => {
      this.settingsChange.emit(v);
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
