export enum FileType {
  TEXT = '.txt',
  JPEG = '.jpg',
}

export const COMMAND_DIR = 'commands';

export const TEMP_DIR_NAME = 'hiderTmp';

export enum ErrorMessages {
  INVALID_PATH = 'is not a valid file',
  INVALID_DIR = 'is not a valid directory path',
  UNSUPPORTED_FILE = 'Unsupported file type, please use .txt files only',
  UNSUPPORTED_IMG = 'Unsupported file type, please use .jpg files only for your hider img.',
}
