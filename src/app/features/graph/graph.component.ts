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
  @Input() nodes: { [id: string]: cytoscape.NodeDefinition } = { };
  @Input() edges: { [id: string]: cytoscape.EdgeDefinition } = { };

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
  private readonly _runZoom = debounce(() => this.zoom = this._graph.zoom(), 500);

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._graph = cytoscape({
      container: this._el.nativeElement,
      style: css,
      layout: GRAPH_LAYOUT,
      selectionType: 'single',
      zoom: this._zoom,
      boxSelectionEnabled: true,
      elements: [
        ...Object.values(this.nodes),
        ...Object.values(this.edges),
      ],
    });

    this._graph.on('zoom', () => {
      this._runZoom();
    });

    this._graph.on('select', debounce((e: cytoscape.EventObject) => {
      this.nodesSelect.emit(e.cy.nodes(':selected').map(n => n.data()));
    }, 100));

    this._graph.on('unselect', debounce((e: cytoscape.EventObject) => {
      this.nodesSelect.emit(e.cy.nodes(':selected').map(n => n.data()));
    }, 100));
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

  layout() {
    this._graph.layout(GRAPH_LAYOUT).run();
  }

  image() {
    return this._graph.png({ output: 'base64' });
  }

  goTo(id: string) {
    const node = this._graph.$id(id);
    this._graph.center(node).fit(node);
  }
}
