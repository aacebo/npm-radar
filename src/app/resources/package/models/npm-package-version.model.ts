import { INpmPackageBase } from './npm-package-base.model';

export interface INpmPackageVersion extends INpmPackageBase {
  readonly version: string;
  readonly dependencies?: { [name: string]: string };
  readonly peerDependencies?: { [name: string]: string };
  readonly devDependencies?: { [name: string]: string };
}
