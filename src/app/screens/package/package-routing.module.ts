import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PackageComponent } from './package.component';
import { PackageResolver } from './package.resolver';

const routes: Routes = [
  {
    path: ':name',
    resolve: { package: PackageResolver },
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
  providers: [PackageResolver],
})
export class PackageRoutingModule { }
