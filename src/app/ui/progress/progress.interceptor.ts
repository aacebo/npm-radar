import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ProgressService } from './progress.service';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
  constructor(private readonly _progressService: ProgressService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this._progressService.increment();

    return next.handle(req).pipe(
      finalize(() => this._progressService.decrement()),
    );
  }
}
