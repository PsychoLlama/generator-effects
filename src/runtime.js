import { run } from './dispatcher';
import createScope from './context/scope';

export default function runtime(program) {
  return new Promise((resolve, reject) => {
    const effects = program();

    function tick(result = effects.next(), scope = createScope()) {
      if (result.done) return resolve(result.value);

      // Assume every yielded value is an effect.
      run(result.value, scope.lookup).map(
        (product) => tick(effects.next(product), scope),
        (error) => {
          try {
            // Give the generator a chance to catch the error.
            tick(effects.throw(error), scope);
          } catch (error) {
            // The program failed. Time to blow up.
            reject(error);
          }
        }
      );
    }

    tick();
  });
}
