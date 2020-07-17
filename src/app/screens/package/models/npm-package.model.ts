import { INpmPackageBase } from './npm-package-base.model';
import { INpmPackageVersion } from './npm-package-version.model';

export interface INpmPackage extends INpmPackageBase {
  readonly 'dist-tags': { [distTag: string]: string };
  readonly versions: { [version: string]: INpmPackageVersion };
}
