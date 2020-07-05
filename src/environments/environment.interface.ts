export interface IEnvironment {
  readonly production: boolean;
  readonly api: {
    readonly pkg: string;
    readonly search: string;
  };
}
