import { run } from './dispatcher';
import * as context from './context';

export default function runtime(program) {
  return new Promise((resolve, reject) => {
    const effects = program();

    function tick(result = effects.next(), ctx = context.create()) {
      if (result.done) return resolve(result.value);

      // Assume every yielded value is an effect.
      run(result.value, ctx.lookup).map(
        (product) => tick(effects.next(product), ctx),
        (error) => {
          try {
            // Give the generator a chance to catch the error.
            tick(effects.throw(error), ctx);
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
