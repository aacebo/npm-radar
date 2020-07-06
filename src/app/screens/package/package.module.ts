import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../ui/icon';
import { ButtonModule } from '../../ui/button';
import { SidenavModule } from '../../ui/sidenav';

import { SearchAutocompleteModule } from '../../features/search-autocomplete';

import { PackageComponent } from './package.component';
import { PackageRoutingModule } from './package-routing.module';

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,

    SearchAutocompleteModule,
    IconModule,
    ButtonModule,
    SidenavModule,
  ],
})
export class PackageModule { }
