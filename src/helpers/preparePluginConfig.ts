const pluginConfigDefaults = {
  includePrerelease: false,
  customTags: ['v${major}'],
};

const preparePluginConfig = (pluginConfig: unknown) => ({
  ...pluginConfigDefaults,
  ...(pluginConfig ? pluginConfig : {}),
});

export type PluginConfigType = ReturnType<typeof preparePluginConfig>;

export default preparePluginConfig;
