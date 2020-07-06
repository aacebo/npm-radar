import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ViewEncapsulation,
  ContentChildren,
  AfterContentInit,
  ViewContainerRef,
  ViewChild,
  AfterViewInit,
  ViewRef,
  QueryList,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { SidenavPosition } from './enums/sidenav-position.enum';
import { SidenavMode } from './enums/sidenav-mode.enum';
import { SidenavState } from './enums/sidenav-state.enum';
import { SIDENAV_ANIMATIONS } from './sidenav.animations';
import { SidenavBodyDirective } from './sidenav-body/sidenav-body.directive';

@Component({
  selector: 'nrr-sidenav',
  template: `<ng-container #view></ng-container>`,
  styleUrls: ['./sidenav.component.scss'],
  animations: [SIDENAV_ANIMATIONS.slideTransition],
  host: {
    class: 'nrr-sidenav',
    '[class.over]': 'mode === SidenavMode.Over',
    '[class.end]': 'position === SidenavPosition.End',
    '[class.closed]': 'open === false',
    '[@slideTransition]': 'slide',
    '(@slideTransition.done)': 'onSlideEnd()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements AfterViewInit, AfterContentInit {
  @Input()
  get position() { return this._position; }
  set position(v) {
    if (v !== this._position) {
      this._position = v;
      this.positionChange.emit(this._position);
    }
  }
  private _position = SidenavPosition.Start;

  @Input()
  get mode() { return this._mode; }
  set mode(v) {
    if (v !== this._mode) {
      this._mode = v;
      this.modeChange.emit(this._mode);
    }
  }
  private _mode = SidenavMode.Side;

  @Input()
  get open() { return this._open; }
  set open(v) {
    if (v !== this._open) {
      this._open = coerceBooleanProperty(v);
      this.state = this.open ? SidenavState.Opening : SidenavState.Closing;
      this.openChange.emit(this._open);
    }
  }
  private _open?: boolean;

  @Input()
  get closeOnBackdropClick() { return this._closeOnBackdropClick; }
  set closeOnBackdropClick(v) {
    if (v !== this._closeOnBackdropClick) {
      this._closeOnBackdropClick = coerceBooleanProperty(v);
    }
  }
  private _closeOnBackdropClick = true;

  @Input()
  get hasBackdrop() { return this._hasBackdrop; }
  set hasBackdrop(v) {
    if (v !== this._hasBackdrop) {
      this._hasBackdrop = coerceBooleanProperty(v);
    }
  }
  private _hasBackdrop = true;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<SidenavState>();
  @Output() modeChange = new EventEmitter<SidenavMode>();
  @Output() positionChange = new EventEmitter<SidenavPosition>();

  @ContentChildren(SidenavBodyDirective, { descendants: false })
  readonly body: QueryList<SidenavBodyDirective>;

  @ViewChild('view', { read: ViewContainerRef })
  readonly view: ViewContainerRef;

  get slide() {
    return {
      value: this.open,
      params: {
        distance: this.position === SidenavPosition.Start ? '-100' : '100',
      },
    };
  }

  get state() { return this._state; }
  set state(v) {
    if (v !== this._state) {
      const prev = this._state;
      this._state = v;

      if (this.view) {
        if (prev === SidenavState.Closed && this._state === SidenavState.Opening) {
          if (this._viewRef) {
            this._viewRef.reattach();
            this.view.insert(this._viewRef);
          } else {
            this._viewRef = this.view.createEmbeddedView(this.body.first.template);
          }
        } else if (this._state === SidenavState.Closed) {
          const idx = this.view.indexOf(this._viewRef);

          if (idx > -1) {
            this.view.detach();
          }
        }
      }

      this.stateChange.emit(v);
      this.cdr.markForCheck();
    }
  }
  private _state?: SidenavState;

  readonly SidenavPosition = SidenavPosition;
  readonly SidenavMode = SidenavMode;
  readonly SidenavState = SidenavState;

  private _viewRef?: ViewRef;

  constructor(
    readonly el: ElementRef<HTMLElement>,
    readonly cdr: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    if (this.open && !this._viewRef) {
      this._viewRef = this.view.createEmbeddedView(this.body.first.template);
    }
  }

  ngAfterContentInit() {
    setTimeout(() => this.cdr.markForCheck());
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.mode === SidenavMode.Over) {
      this.open = false;
    }
  }

  onSlideEnd() {
    this.state = this.open ? SidenavState.Opened : SidenavState.Closed;
  }
}
