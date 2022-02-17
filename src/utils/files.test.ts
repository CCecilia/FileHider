import { fileToHideCheck, imgHiderCheck, outputDirCheck } from './files';

import { ErrorMessages } from './constants';
import { resolve } from 'path';

describe('File Utils Test Suite', () => {
  test('file to hide check | valid file', () => {
    const validMockFilePath = resolve(
      './src/__mock__/mockFiles/validFile.mock.txt'
    );
    const logger = jest.fn();
    const results = fileToHideCheck(validMockFilePath, true, logger);

    expect(results).toEqual(true);
    expect(logger).not.toBeCalled();
  });

  test('file to hide check | invalid file type', () => {
    const invalidMockFilePath = resolve(
      './src/__mock__/mockFiles/invalidFile.mock.pdf'
    );
    const logger = jest.fn();
    const results = fileToHideCheck(invalidMockFilePath, true, logger);

    expect(results).toEqual(false);
    expect(logger).toBeCalled();
    expect(logger).toBeCalledWith(ErrorMessages.UNSUPPORTED_FILE);
  });

  test('file to hide check | incorrect path', () => {
    const invalidPath = './_mock_/temp.txt';
    const logger = jest.fn();
    const results = fileToHideCheck(invalidPath, true, logger);

    expect(results).toEqual(false);
    expect(logger).toBeCalled();
    expect(logger).toBeCalledWith(
      `${invalidPath} ${ErrorMessages.INVALID_PATH}`
    );
  });

  test('hider img check | valid file', () => {
    const validMockFilePath = resolve(
      './src/__mock__/mockFiles/validImage.jpg'
    );
    const logger = jest.fn();
    const results = imgHiderCheck(validMockFilePath, true, logger);

    expect(results).toEqual(true);
    expect(logger).not.toBeCalled();
  });

  test('hider img check | invalid file type', () => {
    const validMockFilePath = resolve(
      './src/__mock__/mockFiles/invalidImage.png'
    );
    const logger = jest.fn();
    const results = imgHiderCheck(validMockFilePath, true, logger);

    expect(results).toEqual(false);
    expect(logger).toBeCalled();
    expect(logger).toBeCalledWith(ErrorMessages.UNSUPPORTED_IMG);
  });

  test('file to hide check | incorrect path', () => {
    const invalidPath = './_mock_/temp.jpg';
    const logger = jest.fn();
    const results = imgHiderCheck(invalidPath, true, logger);

    expect(results).toEqual(false);
    expect(logger).toBeCalled();
    expect(logger).toBeCalledWith(
      `${invalidPath} ${ErrorMessages.INVALID_PATH}`
    );
  });

  test('output dir check | valid', () => {
    const validPath = './src/__mock__/mockFiles';
    const logger = jest.fn();
    const results = outputDirCheck(validPath, true, logger);

    expect(results).toEqual(true);
    expect(logger).not.toBeCalled();
  });

  test('output dir check | invalid dir', () => {
    const invalidPath = './src/__mock__/mockFiles/invalidImage.png';
    const logger = jest.fn();
    const results = outputDirCheck(invalidPath, true, logger);

    expect(results).toEqual(false);
    expect(logger).toBeCalled();
    expect(logger).toBeCalledWith(
      `${invalidPath} ${ErrorMessages.INVALID_DIR}`
    );
  });

  test('output dir check | invalid path', () => {
    const invalidPath = './_mock_/temp.jpg';
    const logger = jest.fn();
    const results = outputDirCheck(invalidPath, true, logger);

    expect(results).toEqual(false);
    expect(logger).toBeCalled();
    expect(logger).toBeCalledWith(
      `${invalidPath} ${ErrorMessages.INVALID_DIR}`
    );
  });
});
