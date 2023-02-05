import type { Context } from 'semantic-release';
import { execSync } from 'node:child_process';

import success from './success';

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('success', () => {
  it('should execute proper commands for basic major tag', () => {
    const repoUrlMock =
      'https://test-user:test-credentials@example.com/my-test-repo.git';
    const contextMock = {
      options: {
        repositoryUrl: repoUrlMock,
      },
      nextRelease: {
        version: '2.1.3',
      },
      logger: { info: jest.fn(), error: jest.fn() },
    } as unknown as Context;
    success(undefined, contextMock);
    expect(execSync).toHaveBeenCalledWith('git tag --force v2');
    expect(execSync).toHaveBeenCalledWith(
      `git push ${repoUrlMock} --force --tags`
    );
  });

  it('should execute proper commands for custom major & minor tag', () => {
    const repoUrlMock =
      'https://test-user:test-credentials@example.com/my-test-repo.git';
    const contextMock = {
      options: {
        repositoryUrl: repoUrlMock,
      },
      nextRelease: {
        version: '2.1.3',
      },
      logger: { info: jest.fn(), error: jest.fn() },
    } as unknown as Context;
    success(
      { customTags: ['v${major}-test', 'v${major}.${minor}'] },
      contextMock
    );
    expect(execSync).toHaveBeenCalledWith('git tag --force v2-test');
    expect(execSync).toHaveBeenCalledWith('git tag --force v2.1');
    expect(execSync).toHaveBeenCalledWith(
      `git push ${repoUrlMock} --force --tags`
    );
  });

  it('should throw error when customTags is not an array', () => {
    const repoUrlMock =
      'https://test-user:test-credentials@example.com/my-test-repo.git';
    const logger = { info: jest.fn(), error: jest.fn() };
    const contextMock = {
      options: {
        repositoryUrl: repoUrlMock,
      },
      nextRelease: {
        version: '2.1.3',
      },
      logger,
    } as unknown as Context;
    expect(() => success({ customTags: 'v${major}' }, contextMock)).toThrow(
      'customTags setting is not an array! customTags: v${major}'
    );
  });

  it('should throw error when invalid customTags provided', () => {
    const repoUrlMock =
      'https://test-user:test-credentials@example.com/my-test-repo.git';
    const logger = { info: jest.fn(), error: jest.fn() };
    const contextMock = {
      options: {
        repositoryUrl: repoUrlMock,
      },
      nextRelease: {
        version: '2.1.3',
      },
      logger,
    } as unknown as Context;
    expect(() => success({ customTags: [true, false] }, contextMock)).toThrow(
      'customTags setting does not contain strings in array! customTags: true,false'
    );
  });

  it('should not create tags for prereleases', () => {
    const repoUrlMock =
      'https://test-user:test-credentials@example.com/my-test-repo.git';
    const contextMock = {
      options: {
        repositoryUrl: repoUrlMock,
      },
      nextRelease: {
        version: '2.1.3-beta.1',
      },
      branch: {
        prerelease: 'beta',
      },
      logger: { info: jest.fn(), error: jest.fn() },
    } as unknown as Context;
    success(
      { customTags: ['v${major}-test', 'v${major}.${minor}'] },
      contextMock
    );
    expect(execSync).not.toBeCalled();
  });
});
