import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElapseTimeModule } from '../../core/pipes';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule, ElapseTimeModule],
})
export class FooterModule { }
