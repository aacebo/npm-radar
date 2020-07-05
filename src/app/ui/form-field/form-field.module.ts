import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from './input/input.component';
import { ErrorComponent } from './error/error.component';
import { LabelComponent } from './label/label.component';
import { FormGroupComponent } from './form-group/form-group.component';
import { PrefixDirective } from './prefix/prefix.directive';
import { SuffixDirective } from './suffix/suffix.directive';

import { FormFieldComponent } from './form-field.component';

const declarations = [
  InputComponent,
  ErrorComponent,
  LabelComponent,
  FormGroupComponent,
  PrefixDirective,
  SuffixDirective,
  FormFieldComponent,
];

@NgModule({
  declarations,
  exports: declarations,
  imports: [CommonModule],
})
export class FormFieldModule { }
