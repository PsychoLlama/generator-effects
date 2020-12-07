const runtime = require('./runtime');

const Marker = {
  Timeout: 'timeout',
  ClearTimeout: 'clear-timeout',
  Log: 'log',
};

const thunks = new WeakMap();
const timeouts = new WeakMap();

function resolve(marker) {
  if (!thunks.has(marker)) {
    throw new Error('Invalid marker');
  }

  return thunks.get(marker);
}

class Effect {
  constructor(type) {
    this.type = type;
  }
}

class TimeoutHandle {}

function defer(type, thunk) {
  const marker = new Effect(type);
  thunks.set(marker, thunk);

  return marker;
}

const effects = {
  timeout: (time, callback) =>
    defer(Marker.Timeout, () => {
      const id = setTimeout(() => {
        runtime.execute(callback);
      }, time);

      const handle = new TimeoutHandle();
      timeouts.set(handle, id);

      return handle;
    }),

  clearTimeout: (handle) =>
    defer(Marker.ClearTimeout, () => {
      if (timeouts.has(handle)) {
        const id = timeouts.get(handle);
        clearTimeout(id);
      }
    }),

  log: (...args) =>
    defer(Marker.Log, () => {
      console.log(...args);
    }),
};

Object.assign(exports, {
  Marker,
  resolve,
  effects,
});
