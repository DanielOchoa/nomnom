
import Funnel from './funnel';
import rsvp from 'rsvp';
import config from '../../config';
import cy from 'cypher-stream';

const cypher = cy(config.neo4jURL);

export default class Neo4jFunnel extends Funnel {

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
    console.log('insert into db called');
    console.log(data);

    const query = `MERGE (n:Netflow) {ip: ${data.src_addr}})
      MERGE(nn:Netflow {ip: ${data.dst_addr}})
      MERGE (n)-[:connect {port: ${data.src_port}, startTime: ${data.start_time}}]`;

    return new rsvp.Promise((res, reject) => {
      setTimeout(() => {
        console.log('funnel timeout done ...');
        //es.resume();
        res();
      }, 3000);
/*      cypher(query)*/
        //.on('end', () => {
          //console.log('saved query: ', query);
          //process.exit(1);
          //res();
        //}).on('error', err => {
          //console.log(JSON.stringify(err));
          //process.exit(1);
          //reject(err);
        //});
    });
  }
}

//{"src_addr":"199.83.168.221","src_port":443,"dst_addr":"246.115.57.104","start_time":49621}

/**
 * create:
 * CREATE (ee:Netflow { "src_addr":"199.83.168.221","src_port":443,"dst_addr":"246.115.57.104","start_time":49621 });
 * dismiss dst_addr, thats the node we'll hit. src_port can be data in the assoc
 *
 * 1. MATCH (aa: Netflow) WHERE aa.src_addr = "199.93..."
 * 2. If empty, create.. CREATE (aa:Netflow {....});
 * 3. Else, return.
 * 4. MATCH
 *
 * 4. (aa)-[:DESTINATION {src_port: "443"}]->()
 *
merge (n:Netflow {ip: "192.168.1.1"})
merge (nn:Netflow {ip: "192.168.1.2"})
merge (n)-[:connect {port: 401, startTime: 12345}]-(nn)
return n, nn
 */
