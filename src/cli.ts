#!/usr/bin/env node

import { hideBin } from 'yargs/helpers';
import yargs from 'yargs';

yargs(hideBin(process.argv))
  .commandDir('commands')
  .strict()
  .alias({ h: 'help' }).argv;
