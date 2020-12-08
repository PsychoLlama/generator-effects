import { run, defer } from '../../dispatcher';
import Future from '../../future';
import * as task from '../task';
import runtime from '../../runtime';
import createScope from '../../context/scope';

describe('Task', () => {
  const success = (x) => defer(() => Future.resolve(x));
  const failure = (x) => defer(() => Future.reject(x));

  describe('.join', () => {
    it('resolves immediately when the list is empty', () => {
      const handler = jest.fn();
      run(task.join([]), createScope()).map(handler);

      expect(handler).toHaveBeenCalledWith([]);
    });

    it('joins two tasks together', async () => {
      await runtime(function* () {
        const results = yield task.join([
          success('a'),
          success('b'),
          success('c'),
        ]);

        expect(results).toEqual(['a', 'b', 'c']);
      });
    });

    it('short-circuits if any task fails', async () => {
      const error = new Error('Testing join errors');
      const promise = runtime(function* () {
        yield task.join([success('a'), failure(error), success('c')]);
      });

      await expect(promise).rejects.toThrow(error);
    });
  });

  describe('.race', () => {
    it('returns the first result to succeed', async () => {
      await runtime(function* () {
        const result = yield task.race([success('a'), success('b')]);
        expect(result).toBe('a');
      });
    });

    it('rejects if the first task to fulfill rejects', async () => {
      const error = new Error('Testing task race errors');
      const promise = runtime(function* () {
        yield task.race([failure(error), success('b'), success('c')]);
      });

      await expect(promise).rejects.toThrow(error);
    });
  });
});
