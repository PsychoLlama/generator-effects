import Future from '../future';
import { defer } from '../runner';

export function print(...values) {
  return defer(() => {
    console.log(...values);
    return Future.resolve();
  });
}

export function error(...values) {
  return defer(() => {
    console.error(...values);
    return Future.resolve();
  });
}
