import { INpmUser } from './npm-user.model';
import { INpmRepository } from './npm-repository.model';

export interface INpmPackageBase {
  readonly _id: string;
  readonly author: INpmUser;
  readonly name: string;
  readonly description: string;
  readonly license: string;
  readonly homepage: string;
  readonly keywords: string[];
  readonly repository: INpmRepository;
}
