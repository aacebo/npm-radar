import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldModule } from '../../ui/form-field';

import { SearchAutocompleteComponent } from './search-autocomplete.component';

@NgModule({
  declarations: [SearchAutocompleteComponent],
  exports: [SearchAutocompleteComponent],
  imports: [
    CommonModule,
    FormFieldModule,
  ],
})
export class SearchAutocompleteModule { }
