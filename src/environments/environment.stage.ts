import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: false,
  api: {
    pkg: 'http://localhost:5001/dppkg-451d0/us-central1/packages/package',
    search: 'http://localhost:5001/dppkg-451d0/us-central1/packages',
  },
  firebase: {
    apiKey: 'AIzaSyDiYiB10padjbaxn0K8bSatjQkLmzf17Dw',
    authDomain: 'dppkg-451d0.firebaseapp.com',
    databaseURL: 'https://dppkg-451d0.firebaseio.com',
    projectId: 'dppkg-451d0',
    storageBucket: 'dppkg-451d0.appspot.com',
    messagingSenderId: '131434320995',
    appId: '1:131434320995:web:68045b917a3336099b9456',
    measurementId: 'G-KR1RZRCEL4',
  },
};
