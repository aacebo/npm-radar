import {
  Directive,
  Input,
  OnInit,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  ElementRef,
  ApplicationRef,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DomPortalOutlet, ComponentPortal } from '@angular/cdk/portal';

import { ThemeColor } from '../core/types/theme-color.type';

import { BadgeComponent } from './badge.component';
import { BadgePosition } from './badge-position.enum';

@Directive({
  selector: '[nrrBadge]',
})
export class BadgeDirective implements OnInit {
  @Input('nrrBadge')
  get content() { return this._content; }
  set content(v: string) {
    this._content = v;
    this._update();
  }
  private _content: string;

  @Input('nrrBadgeColor')
  get color() { return this._color; }
  set color(v: ThemeColor) {
    this._color = v;
    this._update();
  }
  private _color: ThemeColor = 'primary';

  @Input('nrrBadgePosition')
  get position() { return this._position; }
  set position(v: BadgePosition) {
    this._position = v;
    this._update();
  }
  private _position = BadgePosition.TopRight;

  @Input('nrrBadgeDisabled')
  get disabled() { return this._disabled; }
  set disabled(v: boolean) {
    this._disabled = coerceBooleanProperty(v);
    this._update();
  }
  private _disabled?: boolean;

  get badge() { return this._badgeRef.instance; }
  private _badgeRef: ComponentRef<BadgeComponent>;

  constructor(
    private readonly _factoryResolver: ComponentFactoryResolver,
    private readonly _injector: Injector,
    private readonly _el: ElementRef<HTMLElement>,
    private readonly _app: ApplicationRef,
  ) { }

  ngOnInit() {
    this._el.nativeElement.style.position = 'relative';
    const outlet = new DomPortalOutlet(
      this._el.nativeElement,
      this._factoryResolver,
      this._app,
      this._injector,
    );

    const portal = new ComponentPortal(BadgeComponent);
    this._badgeRef = outlet.attach(portal);
    this.badge.el.nativeElement.classList.add('anchored');
    this._update();
  }

  private _update() {
    if (this._badgeRef) {
      this.badge.color = this.color;
      this.badge.content = this.content;
      this.badge.position = this.position;
      this.badge.disabled = this.disabled;
    }
  }
}
