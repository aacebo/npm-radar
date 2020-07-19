import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldModule } from '../../ui/form-field';
import { IconModule } from '../../ui/icon';

import { PackageListComponent } from './package-list.component';
import { PackageListItemComponent } from './package-list-item.component';

@NgModule({
  declarations: [PackageListComponent, PackageListItemComponent],
  exports: [PackageListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    IconModule,
  ],
})
export class PackageListModule { }
