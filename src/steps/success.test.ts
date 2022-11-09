import type { Context } from 'semantic-release';
import { execSync } from 'node:child_process';

import success from './success';

jest.mock('node:child_process', () => ({
  execSync: jest.fn(),
}));

describe('success', () => {
  it('should execute proper commands for basic major tag', () => {
    const repoUrlMock =
      'https://test-user:test-credentials@example.com/my-test-repo.git';
    const contextMock = {
      options: {
        repositoryUrl: repoUrlMock,
        tagFormat: '${version}',
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
});
