import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../ui/icon';
import { ButtonModule } from '../../ui/button';
import { SidenavModule } from '../../ui/sidenav';
import { BadgeModule } from '../../ui/badge';
import { ProgressModule } from '../../ui/progress';

import { SearchAutocompleteModule } from '../../features/search-autocomplete';
import { GraphModule } from '../../features/graph';
import { NodeListModule } from '../../features/node-list';
import { SettingsModule } from '../../features/settings';
import { FooterModule } from '../../features/footer';

import { PackageComponent } from './package.component';
import { PackageRoutingModule } from './package-routing.module';

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,

    SearchAutocompleteModule,
    GraphModule,
    NodeListModule,
    SettingsModule,
    FooterModule,

    IconModule,
    ButtonModule,
    SidenavModule,
    BadgeModule,
    ProgressModule,
  ],
})
export class PackageModule { }
