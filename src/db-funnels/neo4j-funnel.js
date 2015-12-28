
import Funnel from './funnel';
import rsvp from 'rsvp';
import cypher from 'cypher-stream';

cypher('http://localhost:7474');

export default class Neo4jFunnel extends Funnel {
  _insertIntoDb(data) {
    if (!data) { console.log('nada'); }
    console.log(data);
    return rsvp.resolve();
  }
}
