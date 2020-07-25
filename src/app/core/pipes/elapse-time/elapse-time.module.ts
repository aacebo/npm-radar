import { NgModule } from '@angular/core';
import { ElapseTimePipe } from './elapse-time.pipe';

@NgModule({
  declarations: [ElapseTimePipe],
  exports: [ElapseTimePipe],
})
export class ElapseTimeModule { }
