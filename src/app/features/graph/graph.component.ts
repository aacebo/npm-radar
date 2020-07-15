import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import cytoscape from 'cytoscape';

import { GRAPH_LAYOUT } from './graph-layout.constant';
import css from './graph.css';

@Component({
  selector: 'nrr-graph',
  template: '',
  styleUrls: ['./graph.component.scss'],
  host: { class: 'nrr-graph' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements OnInit, OnDestroy {
  @Input() elements: cytoscape.ElementDefinition[] = [];

  @Input()
  get zoom() { return this._zoom; }
  set zoom(v) {
    this._zoom = coerceNumberProperty(v);
    this.zoomChange.emit(v);
  }
  private _zoom = 0.6;

  @Output() zoomChange = new EventEmitter<number>();

  private _graph: cytoscape.Core;
  private _zoomTimeout: NodeJS.Timeout;

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._graph = cytoscape({
      container: this._el.nativeElement,
      elements: this.elements,
      layout: GRAPH_LAYOUT,
      style: css,
      selectionType: 'single',
      zoom: this._zoom,
    });

    this._graph.on('zoom', () => {
      if (this._zoomTimeout) {
        clearTimeout(this._zoomTimeout);
        this._zoomTimeout = undefined;
      }

      this._zoomTimeout = setTimeout(() => {
        this.zoom = this._graph.zoom();
        this._zoomTimeout = undefined;
      }, 500);
    });

    this._graph.center().fit();
  }

  center() {
    this._graph.center();
  }

  fit() {
    this._graph.fit();
  }

  ngOnDestroy() {
    this._graph.destroy();
  }
}
