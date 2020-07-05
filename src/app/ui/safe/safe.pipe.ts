import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {
  constructor(private readonly _sanitizer: DomSanitizer) { }

  transform(v: string, type: 'html' | 'url' | 'resource') {
    if (type === 'html') {
      return this._sanitizer.bypassSecurityTrustHtml(v);
    } else if (type === 'resource') {
      return this._sanitizer.bypassSecurityTrustResourceUrl(v);
    }

    return this._sanitizer.bypassSecurityTrustUrl(v);
  }
}
