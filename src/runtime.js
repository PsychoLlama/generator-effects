import { run } from './dispatcher';
import createScope from './context/scope';
import Future from './future';

export function consumeIntoFuture(effects, scope) {
  return Future((future) => {
    function tick(scope, result = effects.next()) {
      if (result.done) return future.resolve(result.value);

      // Assume every yielded value is an effect.
      run(result.value, scope).map(
        (product) => tick(scope, effects.next(product)),
        (error) => {
          try {
            // Give the generator a chance to catch the error.
            tick(scope, effects.throw(error));
          } catch (error) {
            // The program failed. Time to blow up.
            future.reject(error);
          }
        }
      );
    }

    tick(scope);
  });
}

export default function runtime(program) {
  return new Promise((resolve, reject) => {
    consumeIntoFuture(program(), createScope()).map(resolve, reject);
  });
}
