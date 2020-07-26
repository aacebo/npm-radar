import { NgModule } from '@angular/core';

import { TotalCountPipe } from './total-count.pipe';

@NgModule({
  declarations: [TotalCountPipe],
  exports: [TotalCountPipe],
})
export class TotalCountModule { }
