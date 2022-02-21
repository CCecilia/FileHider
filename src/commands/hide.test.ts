import { mkdirSync, rmdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { FileNames } from '../utils/constants';
import { handler as hideCommand } from './hide';

describe('Hide Command  Test Suite', () => {
  const mockOuputDir = resolve('./src/__mock__/mockOutput/');
  const validMockFilePath = resolve(
    './src/__mock__/mockFiles/validFile.mock.txt'
  );
  const invalidMockFilePath = resolve(
    './src/__mock__/mockFiles/invalidFile.mock.pdf'
  );
  const validMockImgPath = resolve('./src/__mock__/mockFiles/validImage.jpg');

  beforeAll(() => {
    if (!existsSync(mockOuputDir)) {
      mkdirSync(mockOuputDir);
    }
  });

  afterAll(() => {
    rmdirSync(mockOuputDir, { recursive: true });
  });

  test('test command handler hadnles invalid files', async () => {
    const mockExit = jest
      .spyOn(process, 'exit')
      .mockImplementation((number) => {
        throw new Error('process.exit: ' + number);
      });
    expect(() => {
      hideCommand({
        file: invalidMockFilePath,
        img: validMockImgPath,
        output: mockOuputDir,
      } as any);
    }).toThrow();
    expect(mockExit).toHaveBeenCalledWith(0);
    mockExit.mockRestore();
  });

  test('test file get hidden in img gets created', () => {
    hideCommand({
      file: validMockFilePath,
      img: validMockImgPath,
      output: mockOuputDir,
    } as any);

    expect(existsSync(join(mockOuputDir, FileNames.FILE)));
  });
});
