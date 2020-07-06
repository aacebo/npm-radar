import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchResolver } from '../../resources/search';
import { PackageResolver } from '../../resources/package';

import { PackageComponent } from './package.component';

const routes: Routes = [
  {
    path: '',
    component: PackageComponent,
    resolve: {
      package: PackageResolver,
      search: SearchResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PackageResolver, SearchResolver],
})
export class PackageRoutingModule { }
