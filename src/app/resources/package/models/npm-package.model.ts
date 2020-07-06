import { INpmPackageBase } from './npm-package-base.model';
import { INpmPackageVersion } from './npm-package-version.model';

export interface INpmPackage extends INpmPackageBase {
  readonly readme: string;
  readonly 'dist-tags': { [distTag: string]: string };
  readonly time: { [version: string]: Date };
  readonly versions: { [version: string]: INpmPackageVersion };
}
