import execute, { timer, log, task } from 'effect-runtime';

execute(function* () {
  yield log.print('Running timeout...');
  yield timer.sleep(1000);
  yield log.print('Timeout done.');

  const reporter = {
    log: (...args) => console.log('subroutine:', ...args),
    error: (...args) => console.error('subroutine:', ...args),
  };

  const result = yield log.provider.override(reporter, subroutine);

  yield log.print('Subroutine exited:', result);
});

function* subroutine() {
  yield log.print('Starting timers from subroutine...');

  // Resolves when both timers are done.
  yield task.join([timer.sleep(1000), timer.sleep(500)]);

  yield log.print('Timers done.');

  return 'value from subroutine';
}
