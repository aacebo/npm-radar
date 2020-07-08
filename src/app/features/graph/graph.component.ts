import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
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
  @Input()
  get elements() { return this._elements; }
  set elements(v) {
    this._elements = v;

    if (this._graph) {
      this._graph.elements().remove();

      if (v?.length) {
        this._graph.add(v);
        this._graph.layout(GRAPH_LAYOUT).run();
        this._graph.center().fit();
      }
    }
  }
  private _elements: cytoscape.ElementDefinition[] = [];

  @Output() nodeSelect = new EventEmitter<any>();

  private _graph: cytoscape.Core;

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this._graph = cytoscape({
      container: this._el.nativeElement,
      style: css,
      selectionType: 'single',
    });

    this._graph.on('select', e => {
      e.cy.elements().not(e.target).unselect();
      this.nodeSelect.emit(e.target._private?.data);
    });
  }

  center() {
    this._graph.center().fit();
  }

  ngOnDestroy() {
    this._graph.destroy();
  }
}
