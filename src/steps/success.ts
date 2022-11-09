import type { Context } from 'semantic-release';
import { execSync } from 'node:child_process';

const success = (_: unknown, context: Context) => {
  const { options, nextRelease, logger } = context;
  if (!options) {
    logger.error(`Missing options from context!`);
    return;
  }
  if (!nextRelease) {
    logger.error(`Missing nextRelease from context!`);
    return;
  }
  const { repositoryUrl /*, tagFormat*/ } = options;
  const { version } = nextRelease;

  const [major] = version.split('.');
  const newTag = `v${major}`;

  logger.info(`Pushing version tag '${newTag}' to git.`);
  execSync(`git tag --force ${newTag}`);
  execSync(`git push ${repositoryUrl} --force --tags`);
};

export default success;
