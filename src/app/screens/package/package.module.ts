import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../ui/icon';
import { ButtonModule } from '../../ui/button';
import { SidenavModule } from '../../ui/sidenav';
import { BadgeModule } from '../../ui/badge';

import { SearchAutocompleteModule } from '../../features/search-autocomplete';
import { GraphModule } from '../../features/graph';
import { PackageListModule } from '../../features/package-list';

import { PackageComponent } from './package.component';
import { PackageRoutingModule } from './package-routing.module';

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,

    SearchAutocompleteModule,
    GraphModule,
    PackageListModule,

    IconModule,
    ButtonModule,
    SidenavModule,
    BadgeModule,
  ],
})
export class PackageModule { }
