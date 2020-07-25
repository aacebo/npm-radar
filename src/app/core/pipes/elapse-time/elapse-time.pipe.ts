import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elapseTime',
})
export class ElapseTimePipe implements PipeTransform {
  transform(ms: number) {
    const sec = ms / 1000;
    const min = sec / 60;

    if (min >= 1) {
      return `${min.toFixed(2)}min`;
    } else if (sec >= 1) {
      return `${sec.toFixed(2)}s`;
    }

    return `${ms}ms`;
  }
}
