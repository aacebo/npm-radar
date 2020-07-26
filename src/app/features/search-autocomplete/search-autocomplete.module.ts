import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FormFieldModule } from '../../ui/form-field';
import { IconModule } from '../../ui/icon';

import { ListItemModule } from '../list-item';

import { SearchAutocompleteComponent } from './search-autocomplete.component';

@NgModule({
  declarations: [SearchAutocompleteComponent],
  exports: [SearchAutocompleteComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    ListItemModule,
    FormFieldModule,
    IconModule,
  ],
})
export class SearchAutocompleteModule { }
