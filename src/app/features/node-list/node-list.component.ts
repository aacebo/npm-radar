import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { INodeData } from '../graph';

@Component({
  selector: 'nrr-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
  host: { class: 'nrr-node-list' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeListComponent {
  @Input() nodes: cytoscape.NodeDefinition[] = [];
  @Input() weightBySize = false;

  @Output() nodeSelect = new EventEmitter<cytoscape.NodeDefinition>();

  get filtered() {
    return this.nodes.filter(n => !this.control?.value || (n.data as INodeData).id.includes(this.control.value));
  }

  readonly control = new FormControl();
}
