import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackageComponent } from './package.component';
import { PackageRoutingModule } from './package-routing.module';

@NgModule({
  declarations: [PackageComponent],
  imports: [
    CommonModule,
    PackageRoutingModule,
  ],
})
export class PackageModule { }
