import { execute, effects } from 'effect-runtime';

function* otherEffect() {
  yield effects.log('Running side channel');

  yield effects.timeout(2000, function* () {
    yield effects.log('nice');
  });
}

execute(function* () {
  const handle = yield effects.timeout(1000, function* () {
    yield effects.log('timeout 1...');

    yield* otherEffect();

    const handle = yield effects.timeout(500, function* () {
      yield effects.log('timeout 2...');
    });

    yield effects.clearTimeout(handle);

    yield effects.timeout(1000, function* () {
      yield effects.log('timeout 3');
    });
  });

  yield effects.log('Got handle:', handle);
});
