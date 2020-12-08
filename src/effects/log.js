import Future from '../future';
import { define } from '../dispatcher';

export const print = define((getContext, ...values) => {
  console.log(...values);
  return Future.resolve();
});

export const error = define((getContext, ...values) => {
  console.error(...values);
  return Future.resolve();
});
