import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconModule } from '../../ui/icon';

import { PackageComponent } from './package.component';
import { PackageRoutingModule } from './package-routing.module';

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
    IconModule,
  ],
})
export class PackageModule { }
