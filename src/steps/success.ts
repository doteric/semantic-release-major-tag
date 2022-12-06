import type { Context } from 'semantic-release';
import { execSync } from 'node:child_process';

import prepareTags from './prepareTags';
import type { PluginConfigType } from './types';

const success = (pluginConfig: PluginConfigType, context: Context) => {
  const { options, nextRelease, logger } = context;
  if (!options) {
    logger.error(`Missing options from context!`);
    return;
  }
  if (!nextRelease) {
    logger.error(`Missing nextRelease from context!`);
    return;
  }
  const { repositoryUrl } = options;
  const { version } = nextRelease;

  const newTags = prepareTags(version, pluginConfig);

  for (const tag of newTags) {
    logger.info(`Pushing version tag '${tag}' to git.`);
    execSync(`git tag --force ${tag}`);
  }
  execSync(`git push ${repositoryUrl} --force --tags`);
};

export default success;
