import { run } from './runner';

export default function runtime(program) {
  return new Promise((resolve, reject) => {
    const effects = program();

    function tick(result = effects.next()) {
      if (result.done) return resolve(result.value);

      // Assume every yielded value is an effect.
      run(result.value).map(
        (product) => tick(effects.next(product)),
        (error) => {
          try {
            // Give the generator a chance to catch the error.
            tick(effects.throw(error));
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
