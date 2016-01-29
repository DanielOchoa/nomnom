
import Funnel from './funnel';
import rsvp from 'rsvp';
import config from '../../config';
import cy from 'cypher-stream';

const cypher = cy(config.neo4jURL);

export default class Neo4jFunnel extends Funnel {
  constructor() {
    super(arguments);
    this.counter     = 0;
    this.limit       = 100;
    this.transaction = cypher.transaction();
  }
  /**
   * We need to return a promise here. This gets called for each data file,
   * potentially having thousands of recs.
   * @method {_insertIntoDb}
   * @param {Object} object containing the data we'll insert.
   * fields: {"src_addr":"246.114.22.136","src_port":123,"dst_addr":"64.147.116.229","start_time":123}
   * Actual cypher query:
   * merge (n:Netflow {ip: "192.168.1.1"})
   * merge (nn:Netflow {ip: "192.168.1.2"})
   * merge (n)-[:connect {port: 401, startTime: 12345}]-(nn)
   * return n, nn
   */
  _insertIntoDb(data) {
    const query = `MERGE (n:Netflow {ip: "${data.src_addr}"})
      MERGE(nn:Netflow {ip: "${data.dst_addr}"})
      MERGE (n)-[:connect {port: ${data.src_port}, startTime: ${data.start_time}}]->(nn)`;

    this.transaction.write(query);
    this.counter += 1;

    if (this.counter < this.limit) {
      return rsvp.resolve();
    }

    this.counter = 0;

    return new rsvp.Promise((res, reject) => {
      this.transaction
        .on('data', noop)
        .on('end', () => {
          this.transaction = cypher.transaction();
          res();
        })
        .on('error', err => {
          console.log('ERROR', err);
          reject();
        });

      this.transaction.commit();
    });
  }

  cleanup() {
    return new rsvp.Promise((res, reject) => {
      this.transaction
        .on('data', noop)
        .on('end', () => {
          res();
        })
        .on('error', err => {
          console.log('ERROR', err);
          reject();
        });

      this.transaction.commit();
    });
  }
}

function noop() {}
