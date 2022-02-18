#!/usr/bin/env node

import { COMMAND_DIR } from './utils/constants';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

yargs(hideBin(process.argv))
  .commandDir(COMMAND_DIR)
  .strict()
  .alias({ h: 'help' }).argv;
