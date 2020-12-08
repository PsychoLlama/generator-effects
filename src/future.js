/**
 * A future is very much like a promise, except it always executes
 * synchronously, never swallows errors, and doesn't have a concept of
 * unhandled rejections.
 */
export default function Future(executor) {
  const future = {
    value: null,
    state: 'pending',
    subscribers: [],
  };

  function fullfill(state, value) {
    if (future.state !== 'pending') return;
    future.value = value;
    future.state = state;
    future.subscribers.splice(0).map(observe);
  }

  function observe(sub) {
    if (future.state === sub.state) sub.listener(future.value);
    if (future.state === 'pending') future.subscribers.push(sub);
  }

  executor({
    resolve: (x) => fullfill('success', x),
    reject: (x) => fullfill('failure', x),
  });

  return {
    map(successListener, failureListener) {
      return Future((future) => {
        observe({
          state: 'success',
          listener: (x) => future.resolve((successListener || identity)(x)),
        });

        observe({
          state: 'failure',
          listener: (x) => future.reject((failureListener || identity)(x)),
        });
      });
    },
  };
}

Future.resolve = (x) => Future((future) => future.resolve(x));
Future.reject = (x) => Future((future) => future.reject(x));

function identity(x) {
  return x;
}
