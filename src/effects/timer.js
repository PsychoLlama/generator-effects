import Future from '../future';
import { define } from '../dispatcher';

export const sleep = define((milliseconds) => {
  return Future((future) => {
    setTimeout(future.resolve, milliseconds);
  });
});
