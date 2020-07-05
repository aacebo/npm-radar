import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  api: {
    pkg: 'https://registry.npmjs.org',
    search: 'https://www.npmjs.com/search',
  },
};
