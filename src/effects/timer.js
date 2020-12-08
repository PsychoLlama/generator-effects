import Future from '../future';
import { defer } from '../runner';

export function sleep(milliseconds) {
  return defer(() => {
    return Future((future) => {
      setTimeout(future.resolve, milliseconds);
    });
  });
}
