import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'nrr-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  host: { class: 'nrr-icon' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() stroke = 'currentColor';

  @Input()
  get name() { return this._name; }
  set name(v) {
    this._name = v;
    this.icon = feather.icons[v];
  }
  private _name: string;

  @Input()
  get height() { return this._height; }
  set height(v) {
    this._height = coerceNumberProperty(v);
  }
  private _height = 20;

  @Input()
  get width() { return this._width; }
  set width(v) {
    this._width = coerceNumberProperty(v);
  }
  private _width = 20;

  @Input()
  get strokeWidth() { return this._strokeWidth; }
  set strokeWidth(v) {
    this._strokeWidth = coerceNumberProperty(v);
  }
  private _strokeWidth = 2;

  icon: IFeatherIcon;
}
