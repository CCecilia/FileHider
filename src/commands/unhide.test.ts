import { join, resolve } from 'path';
import { FileNames } from '../utils/constants';
import { handler as unhideCommand } from './unhide';
import { existsSync, mkdirSync, rmdirSync } from 'fs';

describe('Unhide Command Test Suite', () => {
  const mockOuputDir = resolve('./src/__mock__/mockOutput/');
  beforeAll(() => {
    if (!existsSync(mockOuputDir)) {
      mkdirSync(mockOuputDir);
    }
  });

  afterAll(() => {
    rmdirSync(mockOuputDir, { recursive: true });
  });

  test('test handler unhides hidden file', () => {
    const hiddenFilePath = resolve(
      join('./src/__mock__/mockFiles/', FileNames.FILE)
    );

    unhideCommand({
      img: hiddenFilePath,
      output: mockOuputDir,
    } as any);

    expect(existsSync(join(mockOuputDir, 'validFile.mock.txt')));
  });
});
