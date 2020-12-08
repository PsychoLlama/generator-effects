import { defer, run } from '../dispatcher';
import Future from '../future';

export function join(tasks) {
  return defer((scope) => {
    return Future((future) => {
      if (tasks.length === 0) return future.resolve([]);

      const results = Array(tasks.length);
      let settled = 0;

      tasks.forEach((task, index) => {
        run(task, scope).map(
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
}

export function race(tasks) {
  return defer((scope) => {
    return Future((future) => {
      tasks.forEach((task) =>
        run(task, scope).map(future.resolve, future.reject)
      );
    });
  });
}
