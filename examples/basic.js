import execute, { timer, log, task } from 'effect-runtime';

execute(function* () {
  log.print('This never prints.');
  yield log.print('Only yielded effects are executed.');
  yield log.print('See ./writing-effects for an example.\n');

  yield log.print('Effects can be async as well.');
  yield log.print('Starting timeout...');
  yield timer.sleep(2000);
  yield log.print('Done.');
  yield log.print('By default, all effects are blocking.\n');

  yield log.print('Async tasks can be run in parallel using `task.join(...)`.');
  yield task.join([
    timer.sleep(500),
    timer.sleep(1000),
    timer.sleep(750),
    timer.sleep(250),
  ]);
  yield log.print('(Four tasks completed in parallel.)\n');

  yield log.print('You can call other functions normally, just use `yield*`.');
  yield log.print('Returned:', yield* subroutine(), '\n');

  yield log.print('Poke around the other examples to see more features.');
});

function* subroutine() {
  yield log.print('Hello from the other function!');

  return 10;
}
