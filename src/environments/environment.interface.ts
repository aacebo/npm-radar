export interface IEnvironment {
  readonly production: boolean;
  readonly api: {
    readonly pkg: string;
    readonly search: string;
  };
  readonly firebase?: {
    readonly apiKey: string;
    readonly authDomain: string;
    readonly databaseURL: string;
    readonly projectId: string;
    readonly storageBucket: string;
    readonly messagingSenderId: string;
    readonly appId: string;
    readonly measurementId: string;
  };
}
