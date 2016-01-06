
import Funnel from './funnel';
import rsvp from 'rsvp';
import cypher from 'cypher-stream';
import config from '../../config';

cypher(config.neo4jURL);

export default class Neo4jFunnel extends Funnel {
  _insertIntoDb(data) {
    // currently here
    if (!data) { console.log('nada'); }
    console.log(data);
    return rsvp.resolve();
  }
}
