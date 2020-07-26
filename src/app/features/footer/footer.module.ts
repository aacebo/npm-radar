import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElapseTimeModule, TotalSizeModule, TotalCountModule } from '../../core/pipes';

import { FooterComponent } from './footer.component';

@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [
    CommonModule,
    ElapseTimeModule,
    TotalSizeModule,
    TotalCountModule,
  ],
})
export class FooterModule { }
