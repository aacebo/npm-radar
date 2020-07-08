export interface IPackageData {
  readonly id: string;
  readonly name: string;
  readonly type?: 'normal' | 'development' | 'peer';
  readonly version: string;
}
