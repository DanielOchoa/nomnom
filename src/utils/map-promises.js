
import rsvp from 'rsvp';

// NOT USED
export default function mapPromises(promises) {
  return promises.reduce((promise, task) => {
    return promise.then(task);
  }, rsvp.resolve());
}
