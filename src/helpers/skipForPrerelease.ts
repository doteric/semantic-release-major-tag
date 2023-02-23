import type { BranchObject } from 'semantic-release';

import type { PluginConfigType } from './preparePluginConfig';

const isPrerelease = (branchObject: BranchObject) => !!branchObject?.prerelease;

const skipForPrerelease = (
  branch: BranchObject,
  pluginConfig: PluginConfigType
): boolean => {
  if (pluginConfig.includePrerelease === true) return false;

  return isPrerelease(branch);
};

export default skipForPrerelease;
