import { INpmUser } from '../../package';

export interface INpmSearchPackage {
  readonly name: string;
  readonly version: string;
  readonly scope: string;
  readonly description: string;
  readonly date: Date;
  readonly author: INpmUser;
  readonly keywords: string[];
  readonly links: { [name: string]: string };
  readonly maintainers: INpmUser[];
  readonly publisher: INpmUser;
}
