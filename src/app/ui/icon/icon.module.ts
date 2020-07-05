import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeModule } from '../safe';

import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  exports: [IconComponent],
  imports: [CommonModule, SafeModule],
})
export class IconModule { }
