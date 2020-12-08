import runtime, { defineEffect, Future, log } from 'effect-runtime';
import http from 'http';

// Effects are defined by wrapping them in a decorator. The decorator wires up
// context and ensures effects are not executed until they are yielded.
const createServer = defineEffect((getContext, options, handler) => {
  const server = http.createServer(handler);

  // All effects must return futures. An effect future is mostly like
  // a promise, except it executes synchronously whenever it can.
  return Future((future) => {
    server.listen(options, (error) => {
      if (error) return future.reject(error);
      future.resolve(server);
    });
  });
});

runtime(function* () {
  // Note: Unless effects are yielded, they *do not* run. The statement below
  // has no effect.
  createServer(null, () => {});

  // The effect's resolve value is returned from `yield`.
  const server = yield createServer(null, (req, res) => res.end('hey\n'));

  // The generator waits for the last effect to finish before continuing, just
  // like you'd expect from async+await.
  yield log.print('Listening:', `http://localhost:${server.address().port}`);
});
