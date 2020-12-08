import Future from '../future';
import { define } from '../dispatcher';

export const sleep = define((getContext, milliseconds) => {
  return Future((future) => {
    setTimeout(future.resolve, milliseconds);
  });
});
