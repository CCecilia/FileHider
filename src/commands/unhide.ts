import type { Arguments, CommandBuilder } from 'yargs';

import { exec } from 'child_process';
import { homedir } from 'os';
import { join } from 'path';
import { stdout } from 'process';

type Options = {
  file: string;
  img: string;
  output: string;
};

export const command = 'unhide <img> [output]';
export const desc = 'Will unhide hidden file in <img> to optional [output]';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
  yargs
    .positional('img', { type: 'string', demandOption: true })
    .positional('output', {
      type: 'string',
      default: join(homedir(), 'Desktop'),
      demandOption: false,
    });

export const handler = (argv: Arguments<Options>): void => {
  const { img, output } = argv;

  exec(`unzip ${img} -d ${output}`, (error, stdout, stderr) => {
    if (error) {
      process.stderr.write(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      process.stderr.write(`${stderr}`);
      return;
    }

    process.stdout.write(stdout);
    process.exit(0);
  });
};
