import Future from '../future';
import { define } from '../dispatcher';

export const print = define((...values) => {
  console.log(...values);
  return Future.resolve();
});

export const error = define((...values) => {
  console.error(...values);
  return Future.resolve();
});
