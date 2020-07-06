import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Input } from '@angular/core';
import * as cytoscape from 'cytoscape';

@Component({
  selector: 'nrr-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  host: { class: 'nrr-graph' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements OnInit {
  @Input()
  get elements() { return this._elements; }
  set elements(v) {
    this._elements = v;
    this.graph.add(v);
  }
  private _elements: cytoscape.ElementDefinition[] = [];

  graph: cytoscape.Core;

  constructor(private readonly _el: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this.graph = cytoscape({
      container: this._el.nativeElement,
      elements: this.elements,
    });
  }
}
