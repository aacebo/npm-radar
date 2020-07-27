import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  api: {
    pkg: 'https://us-central1-dppkg-451d0.cloudfunctions.net/package',
    search: 'https://us-central1-dppkg-451d0.cloudfunctions.net/package',
  },
};
