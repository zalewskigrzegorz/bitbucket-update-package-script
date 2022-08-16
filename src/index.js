#!/usr/bin/env node

import 'dotenv/config';
import App from 'commander';
import updatePackage from './commands/updatePackage.js';
try {
  App
    .version('0.0.1');
  updatePackage(App);

  App.parse(process.argv);
} catch (err) {
  console.error(err);
}
