
import Parser from './parser';
import fs from 'fs';
import es from 'event-stream';
import rsvp from 'rsvp';
import mapSeries from 'promise-map-series';

export default class JSONParser extends Parser {

  streamFiles(files) {
    return mapSeries(files, (file, index) => {
      return this.streamFile(file, index);
    });
  }

  streamFile(file, index) {
    console.log('streaming file...');
    let lineCount = 0;
    return new rsvp.Promise((resolve, reject) => {

      const stream = fs.createReadStream(file, {flags: 'r'})
        .pipe(es.split())
        .pipe(es.parse());

      stream.on('data', line => {
        stream.pause();
        // again, dataCallbacks HAS to be a promise
        return this._dataCallback(line).then(stream.resume.bind(stream));
      });

      stream.on('end', () => {
        // we don't want to have the endcallback fired every time a file is
        // done being streamed. we only want it when it finishes all the
        // files.
        if (this._fileCount === index + 1) {
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

// unused
function mapLine(line, cb) {
  if (line.length > 0) {
    return this._dataCallback(line).then(cb.bind(this, null, line)).catch(cb);
  } else {
    cb();
  }
}
