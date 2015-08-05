'use strict';

import fs from 'fs';
import path from 'path';
import NetFlow from '../models/request-log';
import es from 'event-stream';
import config from '../config';
import RSVP from 'rsvp';

const {
  resolve,
  reject
} = RSVP;

const filePaths = fs.readdirSync(config.paths.json).splice(7);

export default class Ingest {
  constructor() {
    this.stream = null;
  }

  run() {
    return this.streamFileToMongo(filePaths[0]);
  }

  streamFileToMongo(filePath) {
    this.stream = fs.createReadStream(path.join(config.paths.json, filePath))
    .pipe(es.split())
    .pipe(es.map((data, cb) => {
      let flow = new NetFlow(JSON.parse(data));
      flow.save(cb);
    })).on('end', this.onEnd)
    .on('error', this.handleErr)
  }

  onEnd() {
    console.log('done');
    return resolve();
  }

  handleErr(err) {
    console.log(err);
    return reject();
  }
}
