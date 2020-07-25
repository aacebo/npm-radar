import { NgModule } from '@angular/core';

import { TotalSizePipe } from './total-size.pipe';

@NgModule({
  declarations: [TotalSizePipe],
  exports: [TotalSizePipe],
})
export class TotalSizeModule { }
