import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  api: {
    pkg: 'http://localhost:5001/dppkg-451d0/us-central1/packages/package',
    search: 'http://localhost:5001/dppkg-451d0/us-central1/packages',
  },
};
