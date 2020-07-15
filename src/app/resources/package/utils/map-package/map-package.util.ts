import { INpmPackage } from '../../models';
import { mapPackageVersions } from '../map-package-versions/map-package-versions.util';

export function mapPackage(p: INpmPackage) {
  const versions = mapPackageVersions(p);

  return {
    _id: p._id,
    name: p.name,
    description: p.description,
    'dist-tags': p['dist-tags'],
    versions,
  };
}
