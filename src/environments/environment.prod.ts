import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {
  production: true,
  api: {
    pkg: 'https://us-central1-dppkg-451d0.cloudfunctions.net/packages/package',
    search: 'https://us-central1-dppkg-451d0.cloudfunctions.net/packages',
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
