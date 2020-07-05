import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldModule } from '../../ui/form-field';
import { IconModule } from '../../ui/icon';

import { SearchAutocompleteComponent } from './search-autocomplete.component';
import { SearchItemComponent } from './search-item.component';

@NgModule({
  declarations: [SearchAutocompleteComponent, SearchItemComponent],
  exports: [SearchAutocompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    FormFieldModule,
    IconModule,
  ],
})
export class SearchAutocompleteModule { }
