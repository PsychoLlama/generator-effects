const { Marker, resolve } = require("./effects");

const fire = action => {
  const thunk = resolve(action);
  return thunk();
};

function runtime(fn) {
  const iter = fn();
  let result;

  while (true) {
    const next = iter.next(result);
    if (next.done) break;
    result = fire(next.value);
  }
}

exports.execute = runtime;
