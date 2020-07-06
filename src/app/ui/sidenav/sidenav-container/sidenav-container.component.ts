import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  Output,
  EventEmitter,
  ViewEncapsulation,
  AfterContentInit,
  ChangeDetectorRef,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { nrrSubscribableMixin } from '../../core/mixins/subscribable.mixin';

import { SidenavComponent } from '../sidenav.component';
import { SidenavMode } from '../enums/sidenav-mode.enum';

class SidenavContainerBase { }
const _SidenavContainerMixinBase = nrrSubscribableMixin(SidenavContainerBase);

@Component({
  selector: 'nrr-sidenav-container',
  templateUrl: './sidenav-container.component.html',
  styleUrls: ['./sidenav-container.component.scss'],
  host: { class: 'nrr-sidenav-container' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidenavContainerComponent extends _SidenavContainerMixinBase implements AfterContentInit {
  @Output() backdropClicked = new EventEmitter<void>();

  @ContentChild(SidenavComponent)
  readonly sidenav: SidenavComponent;

  get showBackdrop() {
    return this.sidenav.mode === SidenavMode.Over &&
           this.sidenav.open &&
           this.sidenav.hasBackdrop;
  }

  get hasBackdrop() {
    return this.sidenav.mode === SidenavMode.Over &&
           this.sidenav.hasBackdrop;
  }

  constructor(private readonly _cdr: ChangeDetectorRef) { super(); }

  ngAfterContentInit() {
    this.sidenav.openChange.pipe(takeUntil(this.destroy$)).subscribe(() => this._cdr.markForCheck());
    this.sidenav.modeChange.pipe(takeUntil(this.destroy$)).subscribe(() => this._cdr.markForCheck());
    this.sidenav.positionChange.pipe(takeUntil(this.destroy$)).subscribe(() => this._cdr.markForCheck());
  }

  onBackdropClick() {
    this.backdropClicked.emit();

    if (this.sidenav.closeOnBackdropClick) {
      this.sidenav.open = !this.sidenav.open;
    }
  }
}
