import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageComponent } from './package.component';

const routes: Routes = [
  {
    path: ':name',
    component: PackageComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PackageRoutingModule { }
