/**
 *
 * App runs the show
 *
 */

import { JSONParser } from './parsers';
import { Neo4jFunnel } from './db-funnels';
import config from '../config';

const DATA_DIR = config.dataDir;

export default class App {
  constructor() {
    this.JSONParser = new JSONParser();
    this.neo4jFunnel = new Neo4jFunnel();

    this._setupStreamEvents();
  }

  run() {
    console.log('running ...');
    return this.JSONParser.readDir(DATA_DIR).then(files => {
      return this.JSONParser.streamFiles(files);
    }).catch(err => {
      console.log('There was a problem reading from the directory:\n', err);
    });
  }

  /**
   * Private
   */

  _setupStreamEvents() {
    // the data callback needs to return a promisable
    this.JSONParser.on('data', (data) => {
      return this.neo4jFunnel.ingest(data);
    });

    this.JSONParser.on('end', () => {
      return this.neo4jFunnel.cleanup().then(() => {
        return console.log('done!!!');
      });
    });
  }
}
