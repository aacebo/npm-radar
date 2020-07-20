import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SlideToggleModule } from '../../ui/slide-toggle';

import { SettingsComponent } from './settings.component';

@NgModule({
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  imports: [CommonModule, ReactiveFormsModule, SlideToggleModule],
})
export class SettingsModule { }
