declare var feather: {
  readonly icons: { [name: string]: IFeatherIcon };
};

declare interface IFeatherIcon {
  readonly name: string;
  readonly contents: string;
  readonly tags: string[];
  readonly attrs: any;
}

declare module 'cytoscape-fcose';
declare module '*.css';
