import runtime, { log } from 'effect-runtime';

runtime(function* () {
  yield log.print('Hello from the parent function!');

  const reporter = {
    log: (...args) => console.log('-- child:', ...args),
    error: (...args) => console.log('-- child:', ...args),
  };

  yield log.provider.override(reporter, function* () {
    yield log.print('And hello from the the child.');
    yield log.print('Anything inside the override uses the modified logger.');

    yield* nestedFunction();
  });

  yield log.print('Finally back out of the overrides. The console is normal.');
});

function* nestedFunction() {
  yield log.print('It works automatically, even following other functions.');

  yield log.provider.override(console, function* () {
    yield log.print('You can override the same provider more than once!');
    yield log.print('It only affects the child scope.');
  });

  yield log.print('Back in the first override, the console is still mocked.');
}
