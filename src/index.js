#!/usr/bin/env node

import 'dotenv/config'
import updatePackage from './commands/updatePackage.js';
import App from 'commander';
try {
  App
    .version('0.0.1');
  updatePackage(App);

  App.parse(process.argv);
} catch (err) {
  console.error(err);
}
