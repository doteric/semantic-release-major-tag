import type { Context } from 'semantic-release';
import { execSync } from 'node:child_process';

import prepareTags from '../helpers/prepareTags';
import skipForPrerelease from '../helpers/skipForPrerelease';
import preparePluginConfig from '../helpers/preparePluginConfig';

const success = (pluginConfigBare: unknown, context: Context) => {
  const { options, nextRelease, logger, branch } = context;

  // Prepare config with defaults
  const pluginConfig = preparePluginConfig(pluginConfigBare);

  if (skipForPrerelease(branch, pluginConfig)) {
    logger.info('Not publishing any tags on a prerelease!');
    return;
  }

  if (!options) {
    logger.error('Missing options from context!');
    return;
  }
  if (!nextRelease) {
    logger.error('Missing nextRelease from context!');
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
