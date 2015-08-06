'use strict';

import fs from 'fs';
import path from 'path';
import NetFlow from '../models/request-log';
import es from 'event-stream';
import config from '../config';
import RSVP from 'rsvp';
import {throttle} from 'lodash'

// this is terribly hardcoded
const filePaths = fs.readdirSync(config.paths.json).splice(7);

export default class Ingest {
  constructor() {
    this.stream = null;
  }

  run() {
    /**
     * we are currently only pulling one file
     */
    return this.streamFileToMongo(filePaths[0]);
  }

  streamFileToMongo(filePath) {
    return new RSVP.Promise((resolve, reject) => {
      let nomMsg  = this.throttle('nom nom nom...');
      this.stream = fs.createReadStream(path.join(config.paths.json, filePath))
        .pipe(es.split())
        .pipe(es.map((data, cb) => {
        if (data) {
          nomMsg()
          let flow = new NetFlow(JSON.parse(data));
          flow.save(cb);
        } else {
          nomMsg.cancel();
          cb();
        }
      }))
        .on('end', resolve)
        .on('error', reject)
    });
  }

  throttle(msg, time = 1000) {
    return throttle(function() {
      console.log(msg);
    }, time);
  }
}
