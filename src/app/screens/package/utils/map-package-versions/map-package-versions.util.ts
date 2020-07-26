import { INpmPackage, INpmPackageVersion } from '../../models';

export function mapPackageVersions(p: INpmPackage) {
  const versions: { [version: string]: INpmPackageVersion } = { };

  for (const v of Object.keys(p.versions)) {
    versions[v] = {
      _id: p.versions[v]._id,
      name: p.versions[v].name,
      version: p.versions[v].version,
      description: p.versions[v].description,
      dependencies: p.versions[v].dependencies || { },
      dist: {
        fileCount: p.versions[v].dist.fileCount,
        unpackedSize: p.versions[v].dist.unpackedSize,
      },
    };
  }

  return versions;
}
