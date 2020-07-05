import { INpmPackageBase } from './npm-package-base.model';

export interface INpmPackage extends INpmPackageBase {
  readonly readme: string;
  readonly distTags: { [distTag: string]: string };
  readonly time: { [version: string]: Date };
  readonly versions: { [version: string]: INpmPackage };
}
