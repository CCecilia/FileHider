import type { Arguments, CommandBuilder } from 'yargs';
import { fileToHideCheck, imgHiderCheck, outputDirCheck } from '../utils/files';
import { homedir, tmpdir } from 'os';

import AdmZip from 'adm-zip';
import { TEMP_DIR_NAME } from '../utils/constants';
import { exec } from 'child_process';
import { join } from 'path';
import { mkdtempSync } from 'fs';

type Options = {
  file: string;
  img: string;
  output: string;
};

export const command = 'hide <file> <img> [output]';
export const desc = 'Will hide <file> in <image> to optional <output> path';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('file', { type: 'string', demandOption: true })
    .positional('img', { type: 'string', demandOption: true })
    .positional('output', {
      type: 'string',
      default: join(homedir(), 'Desktop'),
      demandOption: false,
    });

export const handler = (argv: Arguments<Options>): void => {
  const { file, img, output } = argv;

  if (
    !fileToHideCheck(file) ||
    !imgHiderCheck(img) ||
    !outputDirCheck(output)
  ) {
    process.exit(0);
  }

  const tempDir = mkdtempSync(join(tmpdir(), TEMP_DIR_NAME));
  const fileToHideZipPath = join(tempDir, 'fileToHide.zip');
  const hiddenFilePath = join(output, 'hiddenFile.jpg');

  const zip = new AdmZip();
  zip.addLocalFile(file);
  zip.writeZip(fileToHideZipPath);
  exec(
    `cat ${img} ${fileToHideZipPath}  > ${hiddenFilePath}`,
    (error, _stdout, stderr) => {
      if (error) {
        process.stderr.write(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        process.stderr.write(`${stderr}`);
        return;
      }

      process.stdout.write(`new hidden file ${hiddenFilePath}`);
      process.exit(0);
    }
  );
};
