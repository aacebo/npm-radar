import { INpmPackageBase } from './npm-package-base.model';

export interface INpmPackageVersion extends INpmPackageBase {
  readonly version: string;
  readonly dependencies?: { [name: string]: string };
  readonly dist: {
    readonly fileCount: number;
    readonly unpackedSize: number;
  };
}
