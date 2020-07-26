import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormFieldModule } from '../../ui/form-field';
import { IconModule } from '../../ui/icon';

import { ListItemModule } from '../list-item';

import { NodeListComponent } from './node-list.component';

@NgModule({
  declarations: [NodeListComponent],
  exports: [NodeListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormFieldModule,
    IconModule,
    ListItemModule,
  ],
})
export class NodeListModule { }
