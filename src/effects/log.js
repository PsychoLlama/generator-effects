import Future from '../future';
import { define } from '../dispatcher';
import createContext from '../context/context';

export const provider = createContext(console);

export const print = define((getContext, ...values) => {
  getContext(provider).log(...values);
  return Future.resolve();
});

export const error = define((getContext, ...values) => {
  getContext(provider).error(...values);
  return Future.resolve();
});
