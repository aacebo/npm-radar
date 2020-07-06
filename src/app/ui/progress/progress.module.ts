import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProgressService } from './progress.service';
import { ProgressInterceptor } from './progress.interceptor';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  imports: [CommonModule],
  providers: [ProgressService],
})
export class ProgressModule {
  static withHttp() {
    return {
      ngModule: ProgressModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ProgressInterceptor, multi: true },
      ],
    };
  }
}
