import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { bytesToString, normalizeWeight, parseVersion } from '../../core/utils';

import { SettingsService } from '../settings';
import { INpmPackage, INpmPackageVersion } from '../../screens/package';

import { INodeData } from './node-data.interface';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  get elements$() { return this._elements$.asObservable(); }
  private readonly _elements$ = new BehaviorSubject<{ [id: string]: cytoscape.EdgeDefinition | cytoscape.NodeDefinition }>({ });

  private _nodes: { [id: string]: cytoscape.NodeDefinition } = { };
  private _edges: { [id: string]: cytoscape.EdgeDefinition } = { };
  private _maxPackageSize = 0;

  constructor(private readonly _settingsService: SettingsService) { }

  reset() {
    this._nodes = { };
    this._edges = { };
    this._maxPackageSize = 0;
  }

  add(pkg: INpmPackageVersion, pkgs: { [name: string]: INpmPackage }) {
    if (pkg.dist.unpackedSize > this._maxPackageSize) {
      this._maxPackageSize = pkg.dist.unpackedSize;
    }

    const weightBySize = this._settingsService.get('weightBySize');
    const dependencies = Object.keys(pkg.dependencies || { });
    const weight = this._calcWeight(pkg.dist.unpackedSize, dependencies.length, weightBySize);
    const node = this._createNode(pkg, dependencies.length, weight, weightBySize);
    const nodes: { [id: string]: cytoscape.NodeDefinition } = { [node.data.id]: node };
    const incomingEdges = this._findIncomingEdges(pkg, pkgs, weightBySize);
    const outgoingEdges = this._findOutgoingEdges(pkg, pkgs, weightBySize);

    // map dependents (incoming edges)
    for (const id of Object.keys(incomingEdges)) {
      const srcNode = this._nodes[incomingEdges[id].data.source];
      nodes[incomingEdges[id].data.source] = srcNode;
    }

    // map dependencies (outgoing edges)
    for (const id of Object.keys(outgoingEdges)) {
      const targetNode = this._nodes[outgoingEdges[id].data.target];
      nodes[outgoingEdges[id].data.target] = targetNode;
    }

    this._nodes = { ...this._nodes, ...nodes };
    this._edges = { ...this._edges, ...incomingEdges, ...outgoingEdges };

    setTimeout(() => {
      this._elements$.next({ ...nodes, ...incomingEdges, ...outgoingEdges });
    }, 500);
  }

  private _calcWeight(size: number | undefined, dependencies: number, weightBySize: boolean) {
    return weightBySize ? normalizeWeight(Math.sqrt(size || 1000), Math.sqrt(this._maxPackageSize), 0) * 100
                        : (dependencies || 1) * 5;
  }

  private _findIncomingEdges(pkg: INpmPackageVersion, pkgs: { [name: string]: INpmPackage }, weightBySize: boolean) {
    const edges: { [id: string]: cytoscape.EdgeDefinition } = { };
    const nodes = Object.values(this._nodes);

    for (const node of nodes) {
      const data = node.data as INodeData;
      const nodePkg = pkgs[data.name]?.versions[data.version];

      if (nodePkg?.dependencies[pkg.name]) {
        const dependencies = Object.keys(nodePkg.dependencies).length;

        const edge = this._createEdge(
          nodePkg,
          pkg,
          dependencies,
          this._calcWeight(nodePkg.dist.unpackedSize, dependencies, weightBySize),
          weightBySize,
        );

        edges[edge.data.id] = edge;
      }
    }

    return edges;
  }

  private _findOutgoingEdges(pkg: INpmPackageVersion, pkgs: { [name: string]: INpmPackage }, weightBySize: boolean) {
    const edges: { [id: string]: cytoscape.EdgeDefinition } = { };
    const dependencies = Object.keys(pkg.dependencies || { });

    for (const name of dependencies) {
      const version = pkg.dependencies[name];
      const dependency = pkgs[name]?.versions[parseVersion(version)];
      const dependencyEdges = Object.keys(dependency?.dependencies || { }).length;

      if (dependency && this._nodes[dependency._id]) {
        const dependencyWeight = this._calcWeight(
          dependency.dist.unpackedSize,
          Object.keys(dependency.dependencies).length,
          weightBySize,
        );

        const edge = this._createEdge(
          pkg,
          dependency,
          dependencyEdges,
          dependencyWeight,
          weightBySize,
        );

        edges[edge.data.id] = edge;
      }
    }

    return edges;
  }

  private _createNode(
    pkg: INpmPackageVersion,
    edges: number,
    weight: number,
    weightBySize: boolean,
  ): cytoscape.NodeDefinition {
    return {
      group: 'nodes',
      selectable: true,
      data: {
        id: pkg._id,
        name: pkg.name,
        version: parseVersion(pkg.version),
        content: `${pkg._id}\n${pkg.dist.unpackedSize ? bytesToString(pkg.dist.unpackedSize) : '??'}`,
        weight,
        size: weightBySize ? (pkg.dist.unpackedSize || 0) / 1024 : undefined,
        fontSize: weight / 10,
        outgoingEdges: !weightBySize ? edges : undefined,
      } as INodeData,
    };
  }

  private _createEdge(
    pkg: INpmPackageVersion,
    dependency: INpmPackageVersion,
    edges: number,
    weight: number,
    weightBySize: boolean,
  ): cytoscape.EdgeDefinition {
    return {
      group: 'edges',
      selectable: false,
      data: {
        id: `${pkg._id} -> ${dependency._id}`,
        source: pkg._id,
        target: dependency._id,
        weight,
        size: weightBySize ? (dependency.dist.unpackedSize || 0) / 1024 : undefined,
        outgoingEdges: !weightBySize ? edges : undefined,
      },
    };
  }
}
