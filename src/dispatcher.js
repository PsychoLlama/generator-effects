import Future from './future';

const thunks = new WeakMap();

class Effect {}

export function defer(thunk) {
  const handle = new Effect();
  thunks.set(handle, thunk);

  return handle;
}

export function define(thunk) {
  return (...args) => defer((scope) => thunk(scope.lookup, ...args));
}

export function run(handle, scope) {
  if (!thunks.has(handle)) {
    return Future((future) => {
      future.reject(new Error(`Yielded value was not an effect.`));
    });
  }

  const thunk = thunks.get(handle);

  // Contract: effect thunks should always return a future.
  return thunk(scope);
}
