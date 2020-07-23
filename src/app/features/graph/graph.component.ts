import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import cytoscape from 'cytoscape';

import { GRAPH_LAYOUT } from './graph-layout.constant';
import { INodeData } from './node-data.interface';
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
  @Input()
  get elements() { return this._elements; }
  set elements(v) {
    this._elements = v;
    const values = Object.values(v || { });

    if (this._graph && values.length) {
      const elems = this._graph.add(values);
      elems.layout({ name: 'random' }).run();
      this._graph.center().fit();

      if (this._layoutTimeout) {
        clearTimeout(this._layoutTimeout);
        this._layoutTimeout = undefined;
      }

      this._layoutTimeout = setTimeout(() => {
        this._graph.layout(GRAPH_LAYOUT).run();
      }, 500);
    }
  }
  private _elements: { [id: string]: cytoscape.EdgeDefinition | cytoscape.NodeDefinition } = { };

  @Input()
  get zoom() { return this._zoom; }
  set zoom(v) {
    this._zoom = coerceNumberProperty(v);
    this.zoomChange.emit(v);
  }
  private _zoom = 0.6;

  @Output() zoomChange = new EventEmitter<number>();
  @Output() nodeSelect = new EventEmitter<INodeData>();

  private _graph: cytoscape.Core;
  private _zoomTimeout: NodeJS.Timeout;
  private _layoutTimeout: NodeJS.Timeout;

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._graph = cytoscape({
      container: this._el.nativeElement,
      elements: [],
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

    this._graph.on('select', e => {
      this.nodeSelect.emit(e.target._private.data);
    });
  }

  ngOnDestroy() {
    this._graph.destroy();
  }

  center() {
    this._graph.center().fit();
  }

  clear() {
    this._graph.elements().remove();
  }

  highlight(name: string) {
    this._graph.nodes().removeClass('highlight');
    this._graph.nodes(`[name = "${name}"]`).addClass('highlight');
  }
}
