
import Parser from './parser';
import fs from 'fs';
import es from 'event-stream';
import rsvp from 'rsvp';
import mapPromises from '../utils/map-promises';

export default class JSONParser extends Parser {

  streamFiles(files) {
    console.log('starting json stream...');
    return mapPromises(files.map((file, i) => {
      return this.streamFile(file, i);
    }));
  }

  streamFile(file, i) {
    return new rsvp.Promise((resolve, reject) => {

      fs.createReadStream(file, {flags: 'r'})
        .pipe(es.split())
        .pipe(es.map(mapLine.bind(this)))

        .on('end', () => {
          // we don't want to have the endcallback fired every time a file is
          // done being streamed. we only want it when it finishes all the
          // files.
          if (this._fileCount === i + 1) {
            this._endCallback();
          }
          return resolve();

        }).on('error', e => {
          this._errorCallback(e);
          return reject();
        });
    });
  }
}

function mapLine(line, cb) {
  if (line.length > 0) {
    return this._dataCallback(line).then(cb.bind(this, null, line)).catch(cb);
  } else {
    cb();
  }
}
