
export default class Funnel {

  constructor(options) {
    this._options = options;

    // _insertIntoDb must be defined by each sublcass of this class
    if (!this._insertIntoDb) {
      throw new Error('the _insertIntoDb method was not implemented on this parser.');
    }
  }

  ingest(data) {
    return this._insertIntoDb(data);
  }
}
