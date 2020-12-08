import { define, run } from '../dispatcher';
import Future from '../future';

export const join = define((tasks) => {
  return Future((future) => {
    if (tasks.length === 0) return future.resolve([]);

    const results = Array(tasks.length);
    let settled = 0;

    tasks.forEach((task, index) => {
      run(task).map(
        (result) => {
          results[index] = result;

          if (++settled === tasks.length) {
            future.resolve(results);
          }
        },
        (error) => {
          future.reject(error);
        }
      );
    });
  });
});

export const race = define((tasks) => {
  return Future((future) => {
    tasks.forEach((task) => run(task).map(future.resolve, future.reject));
  });
});
