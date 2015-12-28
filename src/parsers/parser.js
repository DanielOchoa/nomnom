
import fs from 'fs';
import rsvp from 'rsvp';

const readdir = rsvp.denodeify(fs.readdir.bind(fs));

export default class Parser {
  constructor(options = {}) {
    this._options       = options;
    this._dataCallback  = () => rsvp.resolve();
    this._errorCallback = () => {};
    this._endCallback   = () => {};
  }

  readDir(path) {
    return readdir(path).then(files => {
      this._fileCount = files.length;
      return files.reduce((arr, file) => {
        return arr.concat([`${path}/${file}`]);
      }, []);
    });
  }

  /**
   * supported message types are data, error and end
   * the data callback expects a returned promise, btw.
   */
  on(msgType, callback) {
    this[`_${msgType}Callback`] = callback;
  }
}
