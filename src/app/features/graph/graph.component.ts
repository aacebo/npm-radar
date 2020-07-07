import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input, OnDestroy } from '@angular/core';
import cytoscape from 'cytoscape';

import { GRAPH_LAYOUT } from './graph-layout.constant';
import { GRAPH_STYLE } from './graph-style.constant';

@Component({
  selector: 'nrr-graph',
  template: ``,
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

    if (this._graph) {
      this._graph.elements().remove();

      if (v?.length) {
        this._graph.add(v);
        this._graph.layout(GRAPH_LAYOUT).run();
        this._graph.center();
      }
    }
  }
  private _elements: cytoscape.ElementDefinition[] = [];

  private _graph: cytoscape.Core;

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._graph = cytoscape({
      container: this._el.nativeElement,
      style: GRAPH_STYLE,
      maxZoom: 0.6,
    });
  }

  ngOnDestroy() {
    this._graph.destroy();
  }
}
