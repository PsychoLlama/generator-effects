import execute, { timer, log } from 'effect-runtime';

execute(function* () {
  yield log.print('Running timeout...');
  yield timer.sleep(1000);
  yield log.print('Timeout done.');

  const result = yield* subroutine();

  yield log.print('Subroutine exited:', result);
});

function* subroutine() {
  yield log.print('Starting timer from subroutine...');
  yield timer.sleep(2000);
  yield log.print('Timer done.');

  return 'value from subroutine';
}
