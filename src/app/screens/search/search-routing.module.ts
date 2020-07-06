import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResolver } from '../../resources/search';

import { SearchComponent } from './search.component';

const routes: Routes = [{
  path: '',
  resolve: { search: SearchResolver },
  component: SearchComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SearchResolver],
})
export class SearchRoutingModule { }
