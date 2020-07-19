import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgeComponent } from './badge.component';
import { BadgeDirective } from './badge.directive';

@NgModule({
  declarations: [BadgeDirective, BadgeComponent],
  exports: [BadgeDirective, BadgeComponent],
  entryComponents: [BadgeComponent],
  imports: [CommonModule],
})
export class BadgeModule { }
