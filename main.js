'use strict';

import Ingest from './lib/ingest';
import mongoose from 'mongoose';
import config from './config.js';
import RSVP from 'rsvp';

export default class Main {
  constructor() {
    this.ingest = new Ingest();
  }

  setup() {
    return new RSVP.Promise((resolve, reject) => {
      // connect to db
      mongoose.connect(config.mongoUrl);
      let db = mongoose.connection;
      db.on('error', () => {
        console.log('no connect');
        reject();
      });
      db.once('open', () => {
        console.log(`connected to ${db.host} at port ${db.port} ...`);
        resolve();
      });
    });
  }

  run() {
    // ingest first
    return this.ingest.run();
  }
}
