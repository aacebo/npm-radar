import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchAutocompleteModule } from '../../features/search-autocomplete';

import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchAutocompleteModule,
  ],
})
export class SearchModule { }
