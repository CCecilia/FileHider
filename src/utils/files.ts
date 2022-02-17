import { ErrorMessages, FileType } from './constants';
import { existsSync, statSync } from 'fs';

import { extname } from 'path';
import { logMsg } from './logger';

export const fileToHideCheck = (
  filePath: string,
  showError = true,
  logger: (msg: string) => void = logMsg
): boolean => {
  if (extname(filePath) !== FileType.TEXT) {
    if (showError) {
      logger(ErrorMessages.UNSUPPORTED_FILE);
    }

    return false;
  }

  if (!existsSync(filePath)) {
    if (showError) {
      logger(`${filePath} ${ErrorMessages.INVALID_PATH}`);
    }
    return false;
  }

  const fileStats = statSync(filePath);

  if (!fileStats.isFile()) {
    if (showError) {
      logger(`${filePath} ${ErrorMessages.INVALID_PATH}`);
    }

    return false;
  }

  return true;
};

export const imgHiderCheck = (
  filePath: string,
  showError = true,
  logger: (msg: string) => void = logMsg
): boolean => {
  if (extname(filePath) !== FileType.JPEG) {
    if (showError) {
      logger(ErrorMessages.UNSUPPORTED_IMG);
    }

    return false;
  }

  if (!existsSync(filePath)) {
    if (showError) {
      logger(`${filePath} ${ErrorMessages.INVALID_PATH}`);
    }

    return false;
  }

  const fileStats = statSync(filePath);

  if (!fileStats.isFile()) {
    if (showError) {
      logger(`${filePath} ${ErrorMessages.INVALID_PATH}`);
    }

    return false;
  }

  return true;
};

export const outputDirCheck = (
  dirPath: string,
  showError = true,
  logger: (msg: string) => void = logMsg
): boolean => {
  if (!existsSync(dirPath)) {
    if (showError) {
      logger(`${dirPath} ${ErrorMessages.INVALID_DIR}`);
    }

    return false;
  }

  const isValid = statSync(dirPath).isDirectory();

  if (showError && !isValid) {
    logger(`${dirPath} ${ErrorMessages.INVALID_DIR}`);
  }

  return isValid;
};
