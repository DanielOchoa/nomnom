
import rsvp from 'rsvp';

export default function mapPromises(promises) {
  return promises.reduce((promise, task) => {
    return promise.then(task);
  }, rsvp.resolve());
}
