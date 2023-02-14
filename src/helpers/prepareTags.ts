import type { PluginConfigType } from './preparePluginConfig';

const validateCustomTagsSetting = (
  customTags: unknown
): string[] | undefined => {
  if (!customTags) {
    // No error message as the setting can just be simply not provided
    return;
  }

  if (!Array.isArray(customTags)) {
    throw new Error(
      `customTags setting is not an array! customTags: ${customTags}`
    );
  }

  if (!customTags.every((i) => typeof i === 'string')) {
    throw new Error(
      `customTags setting does not contain strings in array! customTags: ${customTags}`
    );
  }

  return customTags;
};

const prepareTags = (version: string, pluginConfig: PluginConfigType) => {
  const customTags = validateCustomTagsSetting(pluginConfig.customTags);
  const tagsFormat = customTags || ['v${major}'];

  const [major, minor, patch] = version.split('.');

  return tagsFormat.map((tag) =>
    tag
      .replace('${major}', major)
      .replace('${minor}', minor)
      .replace('${patch}', patch)
  );
};

export default prepareTags;
