import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import cytoscape from 'cytoscape';

import { debounce } from '../../core/utils';

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
      this._runLayout();
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
  @Output() nodesSelect = new EventEmitter<INodeData[]>();

  private _graph: cytoscape.Core;
  private readonly _runLayout = debounce(() => this._graph.layout(GRAPH_LAYOUT).run(), 500);
  private readonly _runZoom = debounce(() => this.zoom = this._graph.zoom(), 500);

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._graph = cytoscape({
      container: this._el.nativeElement,
      elements: [],
      style: css,
      selectionType: 'single',
      zoom: this._zoom,
      boxSelectionEnabled: true,
    });

    this._graph.on('zoom', () => {
      this._runZoom();
    });

    this._graph.on('select', debounce((e: cytoscape.EventObject) => {
      this.nodesSelect.emit(e.cy.nodes(':selected').map(n => n.data()));
    }, 500));
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

  image() {
    return this._graph.png({ output: 'base64' });
  }

  goTo(id: string) {
    const node = this._graph.$id(id);
    this._graph.center(node).fit(node);
  }
}
