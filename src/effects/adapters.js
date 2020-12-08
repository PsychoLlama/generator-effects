import { define } from '../dispatcher';
import Future from '../future';

// The `Future` equivalent of `util.promisify(...)`.
export function usingCallback(api) {
  return define((getContext, ...args) => {
    return Future((future) => {
      api(...args, (error, results) => {
        if (error) {
          future.reject(error);
        } else {
          future.resolve(results);
        }
      });
    });
  });
}
