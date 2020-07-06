import { Component, ChangeDetectionStrategy, Inject, forwardRef, ViewEncapsulation, ElementRef, AfterContentInit } from '@angular/core';

import { SidenavContainerComponent } from '../sidenav-container/sidenav-container.component';
import { SidenavPosition } from '../enums/sidenav-position.enum';
import { SidenavMode } from '../enums/sidenav-mode.enum';

@Component({
  selector: 'nrr-sidenav-content',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./sidenav-content.component.scss'],
  host: {
    class: 'nrr-sidenav-content',
    '[style.margin-left.px]': 'marginLeft',
    '[style.margin-right.px]': 'marginRight',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidenavContentComponent implements AfterContentInit {
  get marginLeft() {
    return this._open &&
           this._position === SidenavPosition.Start &&
           this._mode === SidenavMode.Side ? this._width : undefined;
  }

  get marginRight() {
    return this._open &&
           this._position === SidenavPosition.End &&
           this._mode === SidenavMode.Side ? this._width : undefined;
  }

  private get _open() {
    return this._container.sidenav.open;
  }

  private get _mode() {
    return this._container.sidenav.mode;
  }

  private get _position() {
    return this._container.sidenav.position;
  }

  private get _width() {
    return this._container.sidenav.el.nativeElement.clientWidth;
  }

  constructor(
    @Inject(forwardRef(() => SidenavContainerComponent))
    private readonly _container: SidenavContainerComponent,
    private readonly _el: ElementRef<HTMLElement>,
  ) { }

  ngAfterContentInit() {
    setTimeout(() => {
      this._el.nativeElement.style.transition = 'all 0.2s ease-in-out';
    }, 1000);
  }
}
