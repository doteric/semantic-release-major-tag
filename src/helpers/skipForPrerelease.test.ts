import preparePluginConfig from './preparePluginConfig';
import skipForPrerelease from './skipForPrerelease';

describe('skipForPrerelease', () => {
  it('returns correctly when ignore prerelease skip config set', () => {
    expect(
      skipForPrerelease(
        {
          name: 'example-branch',
          prerelease: 'beta',
        },
        preparePluginConfig({ includePrerelease: true })
      )
    ).toBe(false);
  });

  it('returns correctly when branch is not a prerelease', () => {
    expect(
      skipForPrerelease(
        {
          name: 'example-branch',
        },
        preparePluginConfig({})
      )
    ).toBe(false);
  });

  it('returns correctly when prerelease set to empty string', () => {
    expect(
      skipForPrerelease(
        {
          name: 'example-branch',
          prerelease: '',
        },
        preparePluginConfig({})
      )
    ).toBe(false);
  });

  it('returns correctly when prerelease set to string', () => {
    expect(
      skipForPrerelease(
        {
          name: 'example-branch',
          prerelease: 'beta',
        },
        preparePluginConfig({})
      )
    ).toBe(true);
  });

  it('returns correctly when prerelease set to true boolean', () => {
    expect(
      skipForPrerelease(
        {
          name: 'example-branch',
          prerelease: true,
        },
        preparePluginConfig({})
      )
    ).toBe(true);
  });

  it('returns correctly when prerelease set to false boolean', () => {
    expect(
      skipForPrerelease(
        {
          name: 'example-branch',
          prerelease: false,
        },
        preparePluginConfig({})
      )
    ).toBe(false);
  });
});
