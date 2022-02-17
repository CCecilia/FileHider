import { FileType } from './constants';
import { extname } from 'path';
import { statSync } from 'fs';

export const fileToHideCheck = (
  filePath: string,
  showError = true
): boolean => {
  if (extname(filePath) !== FileType.TEXT) {
    if (showError) {
      process.stdout.write('Unsupported file type, please use .txt files only');
    }

    return false;
  }

  const fileStats = statSync(filePath);

  if (!fileStats.isFile()) {
    if (showError) {
      process.stdout.write(`${filePath} is not a valid file`);
    }

    return false;
  }

  return true;
};

export const imgHiderCheck = (filePath: string, showError = true): boolean => {
  if (extname(filePath) !== FileType.JPEG) {
    if (showError) {
      process.stdout.write(
        'Unsupported file type, please use .jpg files only for your hider img.'
      );
    }

    return false;
  }

  const fileStats = statSync(filePath);

  if (!fileStats.isFile()) {
    if (showError) {
      process.stdout.write(`${filePath} is not a valid file`);
    }

    return false;
  }

  return true;
};

export const outputDirCheck = (dirPath: string, showError = true): boolean => {
  const isValid = statSync(dirPath).isDirectory();

  if (showError && !isValid) {
    process.stdout.write(`${dirPath} is not a valid directory path`);
  }

  return isValid;
};
