import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nrr-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: { class: 'nrr-footer' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
